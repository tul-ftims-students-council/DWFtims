import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  const { indexNumber, talks } = req.body;

  const { CLIENT_EMAIL, PRIVATE_KEY, SHEET_NAME } = process.env;

  const limits = {
    'Podstawy testowania automatycznego w procesie CI/CD': 80,
    'Autoprezentacja - element składowy sukcesu. Jak wyjść poza skillset i sięgnąć po więcej?': 120,
    'Agile Workshop': 24
  };

  if (!CLIENT_EMAIL || !PRIVATE_KEY || !SHEET_NAME) {
    return res.status(400).json({
      message: 'Env value is missing'
    });
  }

  if (typeof indexNumber !== 'string' || !Array.isArray(talks) || !indexNumber) {
    return res.status(400).json({
      message: 'Invalid request body'
    });
  }

  if (!talks.length) {
    return res.status(400).json({
      message: 'Musisz wybrać przynajmniej jeden wykład.'
    });
  }

  const isCorrectIndexNumber = /[0-9]{6}/.test(indexNumber);

  if (!isCorrectIndexNumber) {
    return res.status(400).json({
      message: 'Nieprawidłowy numer indeksu.'
    });
  }

  const doc = new GoogleSpreadsheet('1f2jDlJmSXh0ojZgX6_34SFELBoQ-rz5KhI58oZjmj1M');

  await doc.useServiceAccountAuth({
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY
  });

  await doc.loadInfo();

  const sheet = doc.sheetsByTitle[SHEET_NAME];

  const rows = await sheet.getRows();

  const isEmailAlreadyInSheet = !!rows.filter(row => row.indexNumber === indexNumber).length;

  let counter = 0;
  for (let i = 0; i < talks.length; i++) {
    for (let j = 0; j < rows.length; j++) {
      if (rows[j].talks.includes(talks[i])) counter++;
    }
    if (counter > Object.values(limits)[Object.keys(limits).findIndex(key => key === talks[i])]) {
      return res.status(409).json({
        message: 'Warsztat ' + String(talks[i]) + ' osiągnął już limit miejsc.'
      });
    }
    counter = 0;
  }

  if (isEmailAlreadyInSheet) {
    return res.status(409).json({
      message: 'Podałeś zarejestrowany numer indeksu.'
    });
  }

  await sheet.addRow([new Date().toLocaleString(), indexNumber, JSON.stringify(talks)]);

  return res.status(201).json({ message: 'Success' });
}
