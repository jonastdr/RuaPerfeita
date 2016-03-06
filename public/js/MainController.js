angular.module('app',['uiGmapgoogle-maps'])
	.config(function($httpProvider) {
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	})
	.controller('MainController',function ($scope, $log, uiGmapGoogleMapApi, $http) {

		$scope.map = {
			dragZoom: {options: {}},
			center: {
				latitude: -25.0994250,
				longitude: -50.1583220
			},
			pan: true,
			zoom: 14,
			refresh: false,
			events: {
				'click':function(mapModel, eventName, originalEventArgs){
					if($scope.stick.tipo) {
						var pin = {};
						pin.lat = originalEventArgs[0].latLng.lat()
						pin.lng = originalEventArgs[0].latLng.lng()
						pin.icon = $scope.icon;
						$scope.add(pin)
						$scope.$evalAsync();
						$scope.stick = {};
					}
				}
			},
			bounds: {}
		};

		uiGmapGoogleMapApi.then(function () {
			$scope.map.dragZoom = {
				options: {
					visualEnabled: true,
					visualPosition: google.maps.ControlPosition.LEFT,
					visualPositionOffset: new google.maps.Size(35, 0),
					visualPositionIndex: null,
					visualSprite: "http://maps.gstatic.com/mapfiles/ftr/controls/dragzoom_btn.png",
					visualSize: new google.maps.Size(20, 20),
					visualTips: {
						off: "Turn on",
						on: "Turn off"
					}
				}
			}
		});

		$scope.pins = [];

		$http.get('pin').then(function(result){
			var pins = result.data
			angular.forEach(pins,function(p){
				var pin = {};
				pin.lat = p.lat;
				pin.lng = p.long;
				pin.voto = parseInt(p.voto);
				switch (p.tipo){
					case 1:
						pin.title = 'Lombada';
						pin.icon = 'icon/lombada.png';
						break;
					case 2:
						pin.title = 'Remover Lombada';
						pin.icon = 'icon/nao_lombada.png';
						break;
					case 3:
						pin.title = 'Semaforo';
						pin.icon = 'icon/semaforo.png';
						break;
					case 4:
						pin.title = 'Remover Semaforo';
						pin.icon = 'icon/nao_semaforo.png';
						break;
					case 6:
						pin.title = 'Remover Estacionamento';
						pin.icon = 'icon/nao_estacionamento.png';
						break;
				}
				console.log(pin);
				$scope.pins.push(pin);
			})
		})

		$scope.add = function(pin){
			pin.icon = $scope.stick.icon
			pin.html = $scope.stick.html
			pin.title = $scope.stick.title
			pin.voto = $scope.stick.voto
			pin.remover = true;
			var data = {
				lat: pin.lat,
				long: pin.lng,
				tipo:  $scope.stick.tipo
			}
			$http.post('/pin',data).then(function(result){
				console.log(result);
				$scope.pins.push(pin);
			})
		}

		$scope.stick = {};
		$scope.select = function(icon){
			$scope.stick.icon = 'icon/'+icon+'.png';
			$scope.stick.html = 'template/'+icon+'.html';
			switch (icon){
				case 'lombada':
					$scope.stick.title = 'Lombada';
					$scope.stick.tipo = 1;
					$scope.stick.voto = 0;
					break;
				case 'nao_lombada':
					$scope.stick.title = 'Remover Lombada';
					$scope.stick.tipo = 2;
					$scope.stick.voto = 0;
					break;
				case 'semaforo':
					$scope.stick.title = 'Semaforo';
					$scope.stick.tipo = 3;
					$scope.stick.voto = 0;
					break;
				case 'nao_semaforo':
					$scope.stick.title = 'Remover Semaforo';
					$scope.stick.tipo = 4;
					$scope.stick.voto = 0;
					break;
				case 'nao_estacionamento':
					$scope.stick.title = 'Remover Estacionamento';
					$scope.stick.tipo = 6;
					$scope.stick.voto = 0;
					break;
			}
		}

		$scope.votar = function(voto){
			console.log(voto);
		}

	})