var { jest } =  require('@jest/globals');
const medicineRepository = require('../external/nlm/medicine.repository');
const proprietaryInfoService = require('./proprietaryInfo.service');

describe('ProprietaryInfo Service', () => {
    describe('getProprietaryInfo', () => {
        it('should get Proprietary Info when correct rxcui is provided', async () => {
            // Arrange
            const proprietaryInfo = {"proprietaryGroup":{"rxcui":null,"proprietaryInfo":
                [{"rxcui":"141962","name":"azithromycin 250 MG Oral Capsule","type":"PSN",
                "id":"141962","source":"RXNORM"}]}};
            const expectedResult = {
                "proprietaryInfo": [
                    {
                        "type": "PSN",
                        "name": "azithromycin 250 MG Oral Capsule",
                        "rxcui": "141962"
                    }]
            };
            jest.spyOn(medicineRepository, 'fetchProprietaryInformation').mockResolvedValueOnce(proprietaryInfo);
            // Act
            const result = await proprietaryInfoService.getProprietaryInfo('141962');
            // Assert
            expect(result).toBeDefined();
            expect(result).toEqual(expectedResult);
        });
        
        it('should fetch empty Proprietary Info when incorrect rxcui is provided', async () => {
            // Arrange
            const proprietaryInfo = {'proprietaryGroup':{'rxcui':null}};

            jest.spyOn(medicineRepository, 'fetchProprietaryInformation').mockResolvedValueOnce(proprietaryInfo);
            // Act
            const result = await proprietaryInfoService.getProprietaryInfo('121');
            // Assert
            expect(result).toBe(null);
        });

        it('should not fetch Proprietary info when server error', async () => {
            // Arrange
            const proprietaryInfo = {'proprietaryGroup':{'rxcui':null}};

            const httpResponse = {
                data: proprietaryInfo,
                status: 500,
                message: 'Connection hanged'
            }
            jest.spyOn(medicineRepository, 'fetchProprietaryInformation').mockResolvedValueOnce(proprietaryInfo);
            // Act
            try {
                await proprietaryInfoService.getProprietaryInfo('121');
            } catch(err) {
                // Assert
                expect(err.message).toEqual('Connection hanged');
                expect(err.status).toEqual(500);
            }
        });
    });
})