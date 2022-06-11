angular
  .module('app')
  .controller('CharacterDetailsController', [
    'CharactersService',
    '$stateParams',
    CharacterDetailsController
  ]);

function CharacterDetailsController(charactersService, $stateParams) {
  const vm = this;

  vm.characterId = $stateParams.characterId;

  vm.getCharacterDetails = charactersService.findDetails(vm.characterId).then(data => {
    vm.characterData = data.data.data.results[0];

    vm.characterName = vm.characterData.name;
    vm.characterDescription = vm.characterData.description;
    vm.characterPhoto = vm.characterData.thumbnail.path;

    vm.characterComicsData = vm.characterData.comics.items;
    vm.characterSeriesData = vm.characterData.series.items;
    vm.characterStoriesData = vm.characterData.stories.items;
    vm.characterEventsData = vm.characterData.events.items;
  });
}
