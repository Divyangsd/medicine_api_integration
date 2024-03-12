const medicineRepository = require('../external/nlm/medicine.repository');

class ProprietaryInfoService {

  async getProprietaryInfo(rxcui) {
    try {
      let proprietaryDetails = await medicineRepository.fetchProprietaryInformation(rxcui);
      if (proprietaryDetails) {
        let proprietaryInformation = this.mapProprietaryDetails(proprietaryDetails);
        if(!proprietaryInformation.proprietaryInfo) {
            return null;
        }
        return proprietaryInformation;
      }
      return null;
    }
    catch (err) {
      console.error(e);
      throw err;
    }
  }

  mapProprietaryDetails(proprietaryDetailsResponse) {
    try {
      let proprietaryInfo = proprietaryDetailsResponse?.proprietaryGroup?.proprietaryInfo?.map(
        proprietary => {
          let details = {
            type: proprietary?.type,
            name: proprietary?.name,
            rxcui: proprietary?.rxcui
          }
          return details;
        });
      return { proprietaryInfo };
    } catch(err) {
      throw err;
    }
  }
}

module.exports =  new ProprietaryInfoService();
