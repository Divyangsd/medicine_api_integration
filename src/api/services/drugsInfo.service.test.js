var { jest } =  require('@jest/globals');
const medicineRepository = require('../external/nlm/medicine.repository');
const drugsInfoService = require('./drugsInfo.service');

jest.mock('../external/nlm/medicine.repository');

describe('Drugs Info Service', () => {
    describe('getDrugDetails', () => {
        it('should get drug details when correct name is provided', async () => {
            // Arrange
            const drugInfo = {'drugGroup': { 'name': null, 'conceptGroup': 
                [{
                    "tty":"GPCK",
                    "conceptProperties": [{"rxcui":"749780","name":"{3 (azithromycin 500 MG Oral Tablet) } Pack",
                    "synonym":"azithromycin 500 MG Oral Tablet 3 Count Pack",
                    "tty":"GPCK","language":"ENG","suppress":"N","umlscui":""}]
                }]}};
            const expectedResult = {
                'drugGroup' : [{
                    'type': 'clinical pack',
                    'properties':  [
                        {
                            "rxcui": "749780",
                            "drugName": "{3 (azithromycin 500 MG Oral Tablet) } Pack"
                        },
                    ]
                }]
            }
            jest.spyOn(medicineRepository, 'fetchDrugDetailsByName').mockResolvedValueOnce(drugInfo);

            // Act
            const result = await drugsInfoService.getDrugDetails('azithromycin');
            // Assert
            expect(result).toBeDefined();
            expect(result).toEqual(expectedResult);
        });
        
        it('should fetch empty drug details when incorrect name is provided', async () => {
            // Arrange
            const drugInfo = {'drugGroup': { 'name': null }};

            jest.spyOn(medicineRepository, 'fetchDrugDetailsByName').mockResolvedValueOnce(drugInfo);
            // Act
            const result = await drugsInfoService.getDrugDetails('azith');
            // Assert
            expect(result).toBe(null);
        });

        it('should not fetch drug details when server error', async () => {
            // Arrange
            const drugInfo = {'drugGroup': { 'name': null }};

            const httpResponse = {
                data: drugInfo,
                status: 500,
                message: 'Internal Server error'
            }
            jest.spyOn(medicineRepository, 'fetchDrugDetailsByName').mockRejectedValueOnce(httpResponse);
            // Act
            try {
                await drugsInfoService.getDrugDetails('azith');
            } catch(err) {
                // Assert
                expect(err.message).toEqual('Internal Server error');
                expect(err.status).toEqual(500);
            }
        });
    });
})