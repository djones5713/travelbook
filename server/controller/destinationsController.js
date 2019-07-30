

module.exports = {
    getDestinations:(req, res) => {
      // console.log('data0',data)
      const db = req.app.get('db')
      db.get_all_destinations().then(data => {
      // console.log('data1',data)
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
    addDestination: (req, res) => {
      const db = req.app.get('db')
      const { user_id, destination_id } = req.body
      console.log(req.body)
      const date = 'date'
      db.add_destination( [user_id, date, destination_id]).then(data => {
        console.log('hit')
        res.status(200).send(data)
      }).catch(error => {
        console.log('issue')
        res.status(500).send(error, "ADD ISSUE");
      })
    },

    getUserDestination:(req, res) => {
      const { user_id} = req.body
      console.log(req.body)
      console.log(user_id)
      const db = req.app.get('db')
      db.get_user_destinations(user_id).then(data => {
        res.status(200).send(data)
      }).catch(error => {
        console.log('issue')
        res.status(500).send(error, "GET USER ISSUE");
      })
    },

    updateDestination:(req, res) => {
      console.log("Hi Destiny!!", req.params, req.query)
      const db = req.app.get('db');
      const { id, user_id } = req.params;
      const { date } = req.query
      console.log(id, date, 'INFO')
      db.update_user_destination([id, user_id, date]).then(data => {
      console.log(data, 'INFO DATA')
      res.status(200).send(data)
      })
      .catch(error => {
        res.status(500).send(error, "UPDATE ISSUE");
    })  
    },

    deleteDestination: (req, res) => {
      const db = req.app.get('db');
      const { id, user_id } = req.params;
      console.log(id)
      db.delete_user_destination([id, user_id]).then(data => {
        console.log(data, "user")
        res.status(200).send(data)
      })
      .catch(err => {
        res.status(500).send({err: "DELETE ISSUE"})
        console.log(err)
      })
    }

    
}
