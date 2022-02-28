import { NextApiRequest, NextApiResponse } from 'next';
import { Request } from '@lib/types';
import validator from 'validator';

export default async function register(
  req: NextApiRequest, 
  res: NextApiResponse
) {

    const requstedData: Request = {
      email: ((req.body.email as string) || '').trim().toLowerCase(),
      talks: (req.body.talks as string[]) || []
    }

    let statusCode = 400
    if (validator.isEmail(requstedData.email) && requstedData.email.endsWith('@edu.p.lodz.pl')) {
      console.log(requstedData.email.endsWith('@edu.p.lodz.pl'))
      const { GoogleSpreadsheet } = require('google-spreadsheet');
      const doc = await new GoogleSpreadsheet('1fTElXLbUPgy2cgP1zO9omKn8vHDwSixkIkSxA9ZHhJA');

      await doc.useServiceAccountAuth({
        client_email: process.env.CLIENT_EMAIL,
        private_key:  process.env.PRIVATE_KEY,
      });

      await doc.loadInfo(); 

      const developmentSheet = doc.sheetsByTitle['Development'];
      const productionSheet = doc.sheetsByTitle['Production'];
      const testingSheet = doc.sheetsByTitle['Testing'];

      const rows = await testingSheet.getRows();

      let emailExist = false;
      for (let element of rows) {
        if(element.Email === requstedData.email) {
          emailExist = true
          statusCode = 200
        }
      }

      if(!emailExist) {
        await testingSheet.addRow([new Date().toLocaleString(), requstedData.email, JSON.stringify(requstedData.talks)])
        statusCode = 201
      }
    }
    return res.status(statusCode).json({})
  }
  

