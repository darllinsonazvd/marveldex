angular.module('app').controller('AppHeaderController', ['$state', AppHeaderController]);

function AppHeaderController($state) {
  const vm = this;

  vm.backToHome = () => {
    $state.go('home');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
}
