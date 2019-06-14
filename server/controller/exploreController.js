

module.exports = {
    getLocations:(req, res) => {
      const db = req.app.get('db')
      db.get_all_locations().then(data => {
        res.status(200).send(data)
      } )
    }
}