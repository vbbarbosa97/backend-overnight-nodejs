import { Beach } from '@src/models/beach';

describe('Beaches functional test', () => {
  beforeAll(async () => await Beach.deleteMany({}));
  describe('When creating a beach', () => {
    it('shoul create a beach with success', async () => {
      //Given
      const newBeach = {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: 'E',
      };

      //When
      const response = await global.testRequest.post('/beaches').send(newBeach);

      //Then
      expect(response.status).toBe(201);
      //objectContaining: verifica se contém os dados passados, mesmo que haja mais dados
      expect(response.body).toEqual(expect.objectContaining(newBeach));
    });

    it('should return 422 when there is a validation error', async () => {
      //Given
      const newBeach = {
        lat: 'invalid_string',
        lng: 151.289824,
        name: 'Manly',
        position: 'E',
      };

      //When
      const response = await global.testRequest.post('/beaches').send(newBeach);

      //Then
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error:
          'Beach validation failed: lat: Cast to Number failed for value "invalid_string" at path "lat"',
      });
    });
  });
});
