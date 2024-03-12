const medicineRepository = require('../external/nlm/medicine.repository');

const types = {
  "SCD" : "clinical drug",
  "GPCK" : "clinical pack",
  "SBD" : "branded drug",
  "BPCK" : "branded pack"
}

class DrugsInfoService {

  async getDrugDetails(drugName) {
    try {
      let drugDetails = await medicineRepository.fetchDrugDetailsByName(drugName);
      if (drugDetails) {
        let drugInformation = this.mapDrugDetails(drugDetails);
        if(!drugInformation.drugGroup) {
          return null;
      }
        return drugInformation;
      }
      return null;
    }
    catch (err) {
      throw err;
    }
  }

  mapDrugDetails(drugDetailsResponse) {
    try {
      let drugDetails = drugDetailsResponse?.drugGroup?.conceptGroup?.map(
        concept => {
          let details = {
            type: types[concept?.tty],
            properties: concept.conceptProperties.map(property => ({
              rxcui: property?.rxcui,
              drugName: property?.name,
            }))
          }
          return details;
        })
      return { drugGroup : drugDetails };
    } catch(err) {
      throw err;
    }
  }
}

module.exports =  new DrugsInfoService();
