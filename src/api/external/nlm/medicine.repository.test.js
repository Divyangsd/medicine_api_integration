const http = require('../../services/http.service');
const medicienRepository = require('./medicine.repository');
var { jest } =  require('@jest/globals');

jest.mock('../../services/http.service');

describe('Medicine Repository', () => {
    describe('fetchDrugDetailsByName', () => {
        it('should fetch drug details when correct name is provided', async () => {
            // Arrange
            const drugInfo = {'drugGroup': { 'name': null, 'conceptGroup': 
            [{
                "tty":"GPCK",
                "conceptProperties": [{"rxcui":"749780","name":"{3 (azithromycin 500 MG Oral Tablet) } Pack",
                "synonym":"azithromycin 500 MG Oral Tablet 3 Count Pack",
                "tty":"GPCK","language":"ENG","suppress":"N","umlscui":""}]
            }]}};

            const httpResponse = {
                data: drugInfo,
                status: 200
            }
            jest.spyOn(http, 'get').mockResolvedValueOnce(httpResponse);
            // Act
            const result = await medicienRepository.fetchDrugDetailsByName('azithromycin');
            // Assert
            expect(result).toBeDefined();
            expect(result).toBe(drugInfo);
        });
        
        it('should fetch empty drug details when incorrect name is provided', async () => {
            // Arrange
            const drugInfo = {'drugGroup': { 'name': null }};

            const httpResponse = {
                data: drugInfo,
                status: 200
            }
            jest.spyOn(http, 'get').mockResolvedValueOnce(httpResponse);
            // Act
            const result = await medicienRepository.fetchDrugDetailsByName('azith');
            // Assert
            expect(result).toBeDefined();
            expect(result).toBe(drugInfo);
        });

        it('should not fetch drug details when server error', async () => {
            // Arrange
            const drugInfo = {'drugGroup': { 'name': null }};

            const httpResponse = {
                data: drugInfo,
                status: 500,
                message: 'Connection hanged'
            }
            jest.spyOn(http, 'get').mockRejectedValueOnce(httpResponse);
            // Act
            try {
                await medicienRepository.fetchDrugDetailsByName('azith');
            } catch(err) {
                // Assert
                expect(err.message).toEqual('Connection hanged');
                expect(err.status).toEqual(500);
            }
        });
    });

    describe('fetchProprietaryInfoByRxcui', () => {
        it('should fetch Proprietary Info when correct rxcui is provided', async () => {
            // Arrange
            const proprietaryInfo = {"proprietaryGroup":{"rxcui":null,"proprietaryInfo":
            [{"rxcui":"141962","name":"azithromycin 250 MG Oral Capsule","type":"PSN",
            "id":"141962","source":"RXNORM"}]}};
            const httpResponse = {
                data: proprietaryInfo,
                status: 200
            }
            jest.spyOn(http, 'get').mockResolvedValueOnce(httpResponse);
            // Act
            const result = await medicienRepository.fetchProprietaryInformation('141962');
            // Assert
            expect(result).toBeDefined();
            expect(result).toBe(proprietaryInfo);
        });
        
        it('should fetch empty Proprietary Info when incorrect rxcui is provided', async () => {
            // Arrange
            const proprietaryInfo = {'proprietaryGroup':{'rxcui':null}};

            const httpResponse = {
                data: proprietaryInfo,
                status: 200
            }
            jest.spyOn(http, 'get').mockResolvedValueOnce(httpResponse);
            // Act
            const result = await medicienRepository.fetchProprietaryInformation('121');
            // Assert
            expect(result).toBeDefined();
            expect(result).toBe(proprietaryInfo);
        });

        it('should not fetch Proprietary info when server error', async () => {
            // Arrange
            const proprietaryInfo = {'proprietaryGroup':{'rxcui':null}};

            const httpResponse = {
                data: proprietaryInfo,
                status: 500,
                message: 'Connection hanged'
            }
            jest.spyOn(http, 'get').mockRejectedValueOnce(httpResponse);
            // Act
            try {
                await medicienRepository.fetchProprietaryInformation('121');
            } catch(err) {
                // Assert
                expect(err.message).toEqual('Connection hanged');
                expect(err.status).toEqual(500);
            }
        });
    });
});