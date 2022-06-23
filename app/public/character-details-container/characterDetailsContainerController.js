angular
  .module('app')
  .controller('CharacterDetailsController', [
    'CharactersService',
    '$stateParams',
    '$timeout',
    CharacterDetailsController
  ]);

function CharacterDetailsController(charactersService, $stateParams, $timeout) {
  const vm = this;

  vm.characterId = $stateParams.characterId;

  vm.comics = [];
  vm.series = [];
  vm.stories = [];
  vm.events = [];

  vm.offset = 0;
  vm.limit = 20;

  vm.loadingAllDetails = true;
  vm.loadingSectionDetails = false;

  vm.getCharacterDetails = charactersService.findDetails(vm.characterId).then(data => {
    vm.characterData = data.data.data.results[0];

    vm.characterName = vm.characterData.name;
    vm.characterDescription = vm.characterData.description;
    vm.characterPhoto = vm.characterData.thumbnail.path;

    vm.characterComicsData = charactersService
      .seeComics(vm.characterId, vm.offset, vm.limit)
      .then(response => {
        vm.comics = response.data.data.results;
      });

    vm.characterSeriesData = charactersService
      .seeSeries(vm.characterId, vm.offset, vm.limit)
      .then(response => {
        vm.series = response.data.data.results;
      });

    vm.characterStoriesData = charactersService
      .seeStories(vm.characterId, vm.offset, vm.limit)
      .then(response => {
        vm.stories = response.data.data.results;
      });

    vm.characterEventsData = charactersService
      .seeEvents(vm.characterId, vm.offset, vm.limit)
      .then(response => {
        vm.events = response.data.data.results;
      });

    $timeout(function () {
      vm.loadingAllDetails = false;
    }, 1500);
  });

  vm.seeMoreComics = () => {
    vm.loadingSectionDetails = true;
    vm.offset += vm.limit;

    charactersService.seeComics(vm.characterId, vm.offset, vm.limit).then(response => {
      vm.comics = [...vm.comics, ...response.data.data.results];
      vm.loadingSectionDetails = false;
    });
  };

  vm.seeMoreSeries = () => {
    vm.loadingSectionDetails = true;
    vm.offset += vm.limit;

    charactersService.seeSeries(vm.characterId, vm.offset, vm.limit).then(response => {
      vm.series = [...vm.series, ...response.data.data.results];
      vm.loadingSectionDetails = false;
    });
  };

  vm.seeMoreStories = () => {
    vm.loadingSectionDetails = true;
    vm.offset += vm.limit;

    charactersService.seeStories(vm.characterId, vm.offset, vm.limit).then(response => {
      vm.stories = [...vm.stories, ...response.data.data.results];
      vm.loadingSectionDetails = false;
    });
  };

  vm.seeMoreEvents = () => {
    vm.loadingSectionDetails = true;
    vm.offset += vm.limit;

    charactersService.seeEvents(vm.characterId, vm.offset, vm.limit).then(response => {
      vm.events = [...vm.events, ...response.data.data.results];
      vm.loadingSectionDetails = false;
    });
  };
}
