'use strict';
const drugInfoService = require('../services/drugsInfo.service');
const proprietaryService = require('../services/proprietaryInfo.service');
const responseWrapper = require('../responseWrapper');
const { StatusCode } = require('../common/http.enum');
const { ErrorCode } = require('../common/error');

class MedicineController {
  /**
   * Get Drug information by drugName
   * @param {*} req - req.params.drugName
   * @param {*} res
   * @returns proprietaryInfo object
   */
  static async getDrugDetailsByName(req, res) {
    try{
      let result;
      const drugName = req.params.drugName;
      if(!drugName) {
        return responseWrapper.error(res, {
          statusCode: StatusCode.Bad_Request,
          data: {},
          errorCode: ErrorCode.API_VALIDATION_ERROR,
          message: 'Empty Drug Name'
        });
      }
      const response = await drugInfoService.getDrugDetails(drugName);
      if(!response) {
        result = {
          statusCode: StatusCode.No_Content,
          data: {},
        }
      } else {
        result = {
          statusCode: StatusCode.OK,
          data: response
        }
      }
      return responseWrapper.success(res, result);
    } catch(err){
      return responseWrapper.error(res, { ...err, message: 'Error occured while fetching Drug details.'});
    }
  }

  /**
   * Get Proprietary Info by Rxcui
   * @param {*} req - req.params.rxcui
   * @param {*} res 
   * @returns proprietary information object
   */
  static async getProprietaryInfoByRxcui(req, res) {
    try { 
        let result;
        const rxcui = req.params.rxcui;
        if(!rxcui) {
          return responseWrapper.error(res, {
            statusCode: StatusCode.Bad_Request,
            data: {},
            errorCode: ErrorCode.API_VALIDATION_ERROR,
            message: 'Empty RXCUI'
          });
        }
        const response = await proprietaryService.getProprietaryInfo(rxcui);
        if(!response) {
          result = {
            statusCode: StatusCode.No_Content,
            data: {},
          }
        } else {
          result = {
            statusCode: StatusCode.OK,
            data: response
          }
        }
        return responseWrapper.success(res, result);
    } catch(err){
      return responseWrapper.error(res, { ...err, message: 'Error occured while fetching Proprietary Info.'});
    }
  }
}

module.exports = {
    getDrugDetailsByName: MedicineController.getDrugDetailsByName,
    getProprietaryInfoByRxcui: MedicineController.getProprietaryInfoByRxcui,
}