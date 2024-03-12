const http = require('../../services/http.service');

class MedicineRepository {

    async fetchDrugDetailsByName(drugName) {
        try {
            const url = `/REST/drugs.json?name=${drugName}`;
            const response = await http.get(url);
            if(response.status === 200) {
                return response.data;
            }
            return null;
        } catch(err) {
            throw err;
        }
    }

    async fetchProprietaryInformation(rxcui) {
        try {
            const url = `/REST/rxcui/${rxcui}/proprietary.json?srclist=RXNORM`;
            const response = await http.get(url);
            if(response.status === 200) {
                return response.data;
            }
            return null;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = new MedicineRepository();