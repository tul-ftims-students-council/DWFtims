import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  const { email, talks } = req.body;
  const emailParsed = email.trim().toLowerCase();

  if (!(email instanceof String) || !Array.isArray(talks) || !email || !talks) {
    return res.status(400).json({
      message: 'Invalid request body'
    });
  }

  const isCorectEmail = validator.isEmail(emailParsed) && emailParsed.endsWith('@edu.p.lodz.pl');

  if (!isCorectEmail) {
    return res.status(400).json({
      message: 'Incorrect email'
    });
  }

  const doc = new GoogleSpreadsheet('1fTElXLbUPgy2cgP1zO9omKn8vHDwSixkIkSxA9ZHhJA');

  if (!process.env.CLIENT_EMAIL || !process.env.PRIVATE_KEY) {
    return res.status(400).json({
      message: 'No CLIENT_EMAIL or PRIVATE_KEY'
    });
  }

  await doc.useServiceAccountAuth({
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY
  });

  await doc.loadInfo();

  if (!process.env.SHEET_NAME) {
    return res.status(400).json({
      message: 'No SHEET_NAME'
    });
  }

  const sheet = doc.sheetsByTitle[process.env.SHEET_NAME];

  const rows = await sheet.getRows();

  for (let row of rows) {
    if (row.Email === emailParsed) {
      return res.status(409).json({
        message: 'Email alredy exist'
      });
    }
  }

  await sheet.addRow([new Date().toLocaleString(), emailParsed, JSON.stringify(talks)]);

  return res.status(201);
}
