import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  const { email, talks } = req.body;

  const { CLIENT_EMAIL, PRIVATE_KEY, SHEET_NAME } = process.env;

  if (!CLIENT_EMAIL || !PRIVATE_KEY || !SHEET_NAME) {
    return res.status(400).json({
      message: 'Env value is missing'
    });
  }

  if (typeof email !== 'string' || !Array.isArray(talks) || !email || !talks) {
    return res.status(400).json({
      message: 'Invalid request body'
    });
  }

  const emailParsed = email.trim().toLowerCase();

  const isCorectEmail = validator.isEmail(emailParsed) && emailParsed.endsWith('@edu.p.lodz.pl');

  if (!isCorectEmail) {
    return res.status(400).json({
      message: 'Invalid email'
    });
  }

  const doc = new GoogleSpreadsheet('1fTElXLbUPgy2cgP1zO9omKn8vHDwSixkIkSxA9ZHhJA');

  await doc.useServiceAccountAuth({
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY
  });

  await doc.loadInfo();

  const sheet = doc.sheetsByTitle[SHEET_NAME];

  const rows = await sheet.getRows();

  for (let row of rows) {
    if (row.Email === emailParsed) {
      return res.status(409).json({
        message: 'Email already exist'
      });
    }
  }

  await sheet.addRow([new Date().toLocaleString(), emailParsed, JSON.stringify(talks)]);

  return res.status(201);
}
