const dal = require("./db");

//get all teams.
var getF1Teams = function() {
  if(DEBUG) console.log("f1.dal.getF1Teams()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT id, name, country, engine FROM f1_teams"
    dal.query(sql, [], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

var getTeamById = function(id) {
  if(DEBUG) console.log("f1.dal.getTeamById()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT id, name, country, engine FROM f1_teams WHERE id = $1";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

var addTeam = function(name, country, engine) {
  if(DEBUG) console.log("f1.dal.addTeam()");
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO public.f1_teams(name, country, engine) \
        VALUES ($1, $2, $3);";
    dal.query(sql, [name, country, engine], (err, result) => {
      if (err) {
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

var getF1Drivers = function() {
    if(DEBUG) console.log("f1.dal.getF1Drivers()");
    return new Promise(function(resolve, reject) {
      const sql = "SELECT id, first_name, last_name, nationality, team_id FROM f1_drivers"
      dal.query(sql, [], (err, result) => {
        if (err) {
          // logging should go here
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
      }); 
    }); 
  };

  var getDriverById = function(id) {
    if(DEBUG) console.log("f1.dal.getDriverById()");
    return new Promise(function(resolve, reject) {
      const sql = "SELECT id, first_name, last_name, nationality, team_id FROM f1_drivers WHERE id = $1";
      dal.query(sql, [id], (err, result) => {
        if (err) {
          // logging should go here
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
      }); 
    }); 
  };

  var addDriver = function(first_name, last_name, nationality, team_id) {
    if(DEBUG) console.log("f1.dal.addDriver()");
    return new Promise(function(resolve, reject) {
      const sql = "INSERT INTO public.f1_drivers(first_name, last_name, nationality, team_id) \
          VALUES ($1, $2, $3, $4);";
      dal.query(sql, [first_name, last_name, nationality, team_id], (err, result) => {
        if (err) {
            if(DEBUG) console.log(err);
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };

  var getF1Principals = function() {
    if(DEBUG) console.log("f1.dal.getF1Principals()");
    return new Promise(function(resolve, reject) {
      const sql = "SELECT id, first_name, last_name, nationality, team_id FROM team_principals"
      dal.query(sql, [], (err, result) => {
        if (err) {
          // logging should go here
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
      }); 
    }); 
  };

  var getPricipalById = function(id) {
    if(DEBUG) console.log("f1.dal.getPrincipalById()");
    return new Promise(function(resolve, reject) {
      const sql = "SELECT id, first_name, last_name, nationality, team_id FROM team_principals WHERE id = $1";
      dal.query(sql, [id], (err, result) => {
        if (err) {
          // logging should go here
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
      }); 
    }); 
  };

  var addPrincipal = function(first_name, last_name, nationality, team_id) {
    if(DEBUG) console.log("f1.dal.addPrincipal()");
    return new Promise(function(resolve, reject) {
      const sql = "INSERT INTO public.team_principals(first_name, last_name, nationality, team_id) \
          VALUES ($1, $2, $3, $4);";
      dal.query(sql, [first_name, last_name, nationality, team_id], (err, result) => {
        if (err) {
            if(DEBUG) console.log(err);
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };

module.exports = {
    getF1Teams,
    getTeamById,
    addTeam,
    getF1Drivers,
    getDriverById,
    addDriver,
    getF1Principals,
    getPricipalById,
    addPrincipal,
}