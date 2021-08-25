/* eslint-disable no-unused-vars */
const crypto = require('crypto');
const axios = require('axios');
const { json } = require('body-parser');
const { validateData, responseManager } = require('../utils');

const sendToMRIValidate = async (req, _code) => {
  const CurrentDate = new Date(Date.now()).toISOString();

  console.log('==>>> CurrentDate: ', CurrentDate, '\n');

  // LZZT9F4ZLN

  // 6KHP34BTB4
  // XNKBCS94VC
  // BKS6Y7YRFA

  console.log('==>>> can code: ', _code, '\n');

  // Create string for hashing
  const stringForsignature = `${process.env.MRI_PROGRAM_ID}${CurrentDate}${_code}`;
  console.log('==>>> stringForsignature: ', stringForsignature, '\n');

  const secret = process.env.MRI_SECRET_KEY_PROD;
  console.log('==>>> secret: ', secret, '\n');

  // Create HMAC SHA512 Hash
  const hash = crypto
    .createHmac('sha512', secret)
    .update(stringForsignature)
    .digest('base64');

  console.log('==>>> hash: ', hash, '\n');

  // Create Base64 buffer
  const signature = Buffer.from(hash, 'base64');

  console.log('==>>> signature: ', signature.toString('base64'), '\n');

  // Get Forwarded-For IP address
  const forwarded = req.headers['x-forwarded-for'];
  const ipAddress = forwarded
    ? forwarded.split(/, /)[0]
    : req.connection.remoteAddress;

  console.log('==>>> ipAddress: ', ipAddress, '\n');

  const headers = {
    'X-MRI-Program-ID': process.env.MRI_PROGRAM_ID,
    'X-MRI-Signature': signature.toString('base64'),
    'X-MRI-Forwarded-For': ipAddress,
    'X-MRI-Timestamp': CurrentDate,
  };

  const body = {
    codes: [_code],
  };

  console.log('==>>> body: ', body, '\n');

  console.log('==>>> headers: ', JSON.stringify(headers, null, 2), '\n');

  const ret = await axios
    .post(process.env.MRI_VALIDATE_URL_PROD, body, { headers })
    .then((response) => {
      console.log(response.data);
      return {
        success: response.data[0].success,
        data: response.data[0],
        message: response.data[0].description,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        success: false,
        data: { message: error.message },
        message: error.message,
      };
    });

  return ret;
};

const sendToMRISubmit = async (req, _code) => {
  const CurrentDate = new Date(Date.now()).toISOString();

  console.log('==>>> CurrentDate: ', CurrentDate, '\n');

  // LZZT9F4ZLN

  // 6KHP34BTB4
  // XNKBCS94VC
  // BKS6Y7YRFA

  console.log('==>>> can code: ', _code, '\n');

  // Create string for hashing
  const stringForsignature = `${process.env.MRI_PROGRAM_ID}${CurrentDate}${process.env.MRI_USER_ID}${_code}${process.env.MRI_POSTAL_CODE}`;
  console.log('==>>> stringForsignature: ', stringForsignature, '\n');

  const secret = process.env.MRI_SECRET_KEY_PROD;
  console.log('==>>> secret: ', secret, '\n');

  // Create HMAC SHA512 Hash
  const hash = crypto
    .createHmac('sha512', secret)
    .update(stringForsignature)
    .digest('base64');

  console.log('==>>> hash: ', hash, '\n');

  // Create Base64 buffer
  const signature = Buffer.from(hash, 'base64');

  console.log('==>>> signature: ', signature.toString('base64'), '\n');

  // Get Forwarded-For IP address
  const forwarded = req.headers['x-forwarded-for'];
  const ipAddress = forwarded
    ? forwarded.split(/, /)[0]
    : req.connection.remoteAddress;

  console.log('==>>> ipAddress: ', ipAddress, '\n');

  const headers = {
    'X-MRI-Program-ID': process.env.MRI_PROGRAM_ID,
    'X-MRI-Signature': signature.toString('base64'),
    'X-MRI-Forwarded-For': ipAddress,
    'X-MRI-Timestamp': CurrentDate,
  };

  const body = {
    'codes': [_code],
    'user_id': process.env.MRI_USER_ID,
    'postal': process.env.MRI_POSTAL_CODE,
  };

  console.log('==>>> body: ', body, '\n');

  console.log('==>>> headers: ', JSON.stringify(headers, null, 2), '\n');

  const ret = await axios
    .post(process.env.MRI_REGISTER_URL_PROD, body, { headers })
    .then((response) => {
      console.log(response.data);
      return { success: true, data: response.data, message: '' };
    })
    .catch((error) => {
      console.log(error);
      return {
        success: false,
        data: { message: error.message },
        message: error.message,
      };
    });

  return ret;
};

const sendToAttentive = async (req) => {
  const headers = {
    Authorization: `Bearer ${process.env.ATT_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const payload = { phone: req.body.phone };

  console.log('==>>> headers: ', JSON.stringify(headers, null, 2), '\n');
  console.log('==>>> url: ', process.env.ATT_URL, '\n');

  const ret = await axios
    .post(process.env.ATT_URL, { ...payload }, { headers })
    .then((response) => {
      console.log('==>>> response:', response.data);
      return { success: true, data: response.data, message: '' };
    })
    .catch((error) => {
      console.log('==>>> error: ', error);
      return {
        success: false,
        data: { message: error.message },
        message: error.message,
      };
    });

  return ret;
};

const sendToSF = async (req) => {
  // AUTH

  const body = {
    grant_type: process.env.SF_GRANT_TYPE,
    client_id: process.env.SF_CLIENT_ID,
    client_secret: process.env.SF_CLIENT_SECRET,
    scope: process.env.SF_SCOPE,
    account_id: process.env.SF_ACCOUNT_ID,
  };

  console.log('==>>> body: ', body, process.env.SF_GRANT_TYPE, '\n');

  let resp;
  await axios
    .post(process.env.SF_AUTH_URL, { ...body })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .then((data) => {
      resp = data;
    })
    .catch((error) => {
      console.log(error.response.data);
    });

  console.log('==>>> access_token: ', resp.access_token);
  console.log('==>>> scope: ', resp.scope);
  console.log('==>>> token_type: ', resp.token_type);

  // SUBMIT

  const CurrentDate = new Date(Date.now()).toISOString();
  console.log('==>>> CurrentDate: ', CurrentDate, '\n');

  const headersSubmit = {
    Authorization: `Bearer ${resp.access_token}`,
    'Content-Type': 'application/json',
  };

  let OptIns = '100022221_PTR_RockStar_SMS_20210520,100022221_PTR_RockStar_20200107';
  OptIns = req.body.newsletterOptIn ? OptIns + ',100022221_PTR_NEWSLETTER_PEPSICOTRNEWS_20200819' :  OptIns;

  const bodySubmit = [
    {
      keys: {
        EmailAddress: req.body.email,
        SourceID: process.env.SourceID,
        TimeStamp: CurrentDate,
      },
      values: {
        OptIns,
        FirstName: req.body.fName,
        LastName: req.body.lName,
        Country: 'US',
        PhoneNumber: req.body.phone,
        EmailAddress: req.body.email,
      },
    },
  ];

  console.log('==>>> bodySubmit:', bodySubmit);

  const ret = await axios
    .post(process.env.SF_SUBMIT_URL_PROD, bodySubmit, {
      headers: headersSubmit,
    })
    .then((response) => {
      console.log(response.data);
      console.log('==>>> response:', response.data);
      return {
        success: true,
        data: { ...response.data[0].values },
        message: '',
      };
    })
    .catch((error) => {
      console.log('==>>> error: ', error);
      return {
        success: false,
        data: { message: error.message },
        message: error.message,
      };
    });
  return ret;
};

/**
 * Create an activity record
 * @function
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The callback function
 * @return {function} - Returns the called callback function
 */
exports.postRegister = async (req, res, next) => {
  const v = validateData(res, next, [
    { string: req.body.email, isOptional: false },
    { bool: req.body.newsletterOptIn, isOptional: false },
    { string: req.body.email, isOptional: false },
    { string: req.body.fName, isOptional: false },
    { string: req.body.lName, isOptional: false },
    { string: req.body.phone, isOptional: false },
  ]);

  if (v) {
    const attRet = await sendToAttentive(req);

    let sfRet;
    if (attRet.success) {
      sfRet = await sendToSF(req);
    }

    responseManager(
      res,
      {1: attRet.data, 2: sfRet},
      attRet.success,
      attRet.message,
    );
  } else {
    responseManager(res, req.body, false, 'Validation failed');
  }

  return next();
};

/**
 * Create an activity record
 * @function
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The callback function
 * @return {function} - Returns the called callback function
 */
exports.postValidateCode = async (req, res, next) => {
  const v = validateData(res, next, [
    { string: req.body.code, isOptional: false },
  ]);

  if (v) {
    const ret = await sendToMRIValidate(req, req.body.code);
    responseManager(res, ret.data, ret.success, ret.message);
  } else {
    responseManager(res, req.body, false, 'Validation failed');
  }

  return next();
};

/**
 * Create an activity record
 * @function
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The callback function
 * @return {function} - Returns the called callback function
 */
exports.postSubmit = async (req, res, next) => {
  const v = validateData(res, next, [
    { string: req.body.code, isOptional: false }
  ]);

  if (v) {
    const ret = await sendToMRISubmit(req, req.body.code);
    responseManager(res, ret.data, ret.success, ret.message);
  } else {
    responseManager(res, req.body, false, 'Validation failed');
  }

  return next();
};
