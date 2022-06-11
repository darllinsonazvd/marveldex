angular.module('app').controller('HomeController', ['CharactersService', '$state', HomeController]);

function HomeController(charactersService, $state) {
  const vm = this;

  vm.characters = [];
  vm.searchName = '';
  vm.offset = 0;

  vm.limits = [5, 10, 20];
  vm.limit = vm.limits[2];
  vm.totalItems = 0;

  vm.error = false;
  vm.errorMessage = '';

  vm.search = () => {
    vm.offset = 0;
    vm.getCharacters(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  vm.getCharacters = reset => {
    charactersService
      .getAllCharacters(vm.searchName, vm.offset, vm.limit)
      .then(response => {
        if (response.data.data.results.length !== 0 && vm.searchName !== '') {
          vm.error = false;
          vm.totalItems = response.data.data.total;
          if (reset) {
            vm.characters = response.data.data.results;
          } else {
            vm.characters = [...vm.characters, ...response.data.data.results];
          }
        } else if (response.data.data.results.length === 0) {
          vm.error = true;
          vm.characters = [];
          vm.errorMessage = 'No characters found according to your search.';
        } else if (vm.searchName === '') {
          vm.error = true;
          vm.characters = [];
          vm.errorMessage = "Enter the character's name!";
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  vm.seeDetails = character => {
    $state.go('details', { characterId: character.id });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    charactersService.findDetails(character.id).then(data => {});
  };

  vm.switchLimit = limit => {
    vm.limit = limit;
  };

  vm.seeMore = () => {
    vm.offset += vm.limit;
    vm.getCharacters();
  };
}
