const express = require('express');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: 'CRUD Komik API aktif' });
});

app.get('/komik', async (req, res) => {
  try {
    res.json(await db.Komik.findAll());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/komik', async (req, res) => {
  try {
    res.status(201).json(await db.Komik.create(req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/komik/:id', async (req, res) => {
  try {
    const komik = await db.Komik.findByPk(req.params.id);
    if (!komik) return res.status(404).json({ message: 'Komik tidak ditemukan' });
    await komik.update(req.body);
    res.json({ message: 'Komik berhasil diupdate', komik });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/komik/:id', async (req, res) => {
  try {
    const komik = await db.Komik.findByPk(req.params.id);
    if (!komik) return res.status(404).json({ message: 'Komik tidak ditemukan' });
    await komik.destroy();
    res.json({ message: 'Komik berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

if (require.main === module) {
  db.sequelize.sync()
    .then(() => app.listen(PORT, () => console.log(`Server started on port ${PORT}`)))
    .catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
}

module.exports = { app, db };
