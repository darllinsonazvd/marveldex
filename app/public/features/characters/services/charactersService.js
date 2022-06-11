angular.module('app').service('CharactersService', function ($http, env) {
  this.getAllCharacters = (name, offset, limit) => {
    const params = {
      ts: 1,
      apikey: 'b325df77d750bc764b37ecfffb29dd11',
      hash: '940894046ae5b6a4c1d73355b75bf056',
      offset,
      limit
    };

    if (name != null && name != '' && name != undefined) {
      params['nameStartsWith'] = name;
    }

    return $http.get(`${env.apiUrl}characters`, {
      params
    });
  };

  this.findDetails = characterId => {
    const params = {
      ts: 1,
      apikey: 'b325df77d750bc764b37ecfffb29dd11',
      hash: '940894046ae5b6a4c1d73355b75bf056'
    };

    return $http.get(`${env.apiUrl}characters/${characterId}`, {
      params
    });
  };
});
