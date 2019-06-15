

module.exports = {
    getDestinations:(req, res) => {
      const db = req.app.get('db')
      db.get_all_destinations().then(data => {
        res.status(200).send(data)
      } )
    }
}