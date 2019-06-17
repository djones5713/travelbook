

module.exports = {
    getDestinations:(req, res) => {
      const db = req.app.get('db')
      db.get_all_destinations().then(data => {
        res.status(200).send(data)
      })
    },

    searchDestinations:(req, res) => {
      const db = req.app.get('db')
      const { country, region } = req.params
      console.log([region, country])
      db.search_destination([region, country]).then(data => {
        console.log('sending data', data)
        res.status(200).send(data)
      })
    },

    createDestination: (req, res) => {
      const db = req.app.get('db')
      const { region, country, destination, image_url, description } = req.body
      console.log('HIT2')
      db.create_destination([region, country, destination, image_url, description ]).then((data) => {
      console.log('HIT3') 
       res.status(200).send(data)
      })
      .catch(error => {
        res.status(500).send(error,"CREATE ISSUE");
      })

    },

    getUserDestination:(req, res) => {
      const db = req.app.get('db')
      db.get_user_destinations().then(data => {
        res.status(200).send(data)
      })
    },

    updateDestination:(req, res) => {
      const db = req.app.get('db')
      const { params, query } = req;
      console.log('HIT2')
      db.update_user_destination([params.id, query.date]).then((data) => {
      console.log('HIT3')
      res.status(200).send(data)
      })
      .catch(error => {
        res.status(500).send(error, "UPDATE ISSUE");
    })  
    },

    deleteDestination: (req, res) => {
      const db = req.app.get('db');
      const { params } = req;
      db.delete_user_destination(params.id).then((data) => {
      console.log('HIT3')
      res.status(200).send(data)
      })
      .catch(err => {
        res.status(500).send({err: "DELETE ISSUE"})
        console.log(err)
      })
    }
}
