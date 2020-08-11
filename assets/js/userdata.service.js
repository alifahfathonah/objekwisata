angular
	.module('userdata.service', ['helper.service'])
	.factory('readWisataService', readWisataService)

function readWisataService($http, $q, helperServices) {
	var url = helperServices.url + '/objekwisata/guest/wisata/';
	var service = {
		Items: []
	};
	service.get = function () {
		var def = $q.defer();
		id = helperServices.absUrl.split('/');
		id = id[id.length - 1];
		if (service.instance) {
			def.resolve(service.Items);
		} else {
			$http({
				method: 'Get',
				url: url + 'getData/' + id,
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(
				(response) => {
					service.instance = true;
					service.Items = response.data;
					def.resolve(service.Items);
				},
				(err) => {
					swal("Information!", err.data, "error");
					def.reject(err);
				}
			);
		}
		return def.promise;
	};

	service.validasi = function (param) {
		var def = $q.defer();
		$http({
			method: 'POST',
			url: url + 'validasi',
			data: param,
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(
			(response) => {
				if(!service.Items.data){
					var data = service.Items.find(x => x.idRencanaKerja == param.idRencanaKerja);
					if (data) {
						data.status = 'Usulan'
					}
				}else
					service.Items.data.status = 'Usulan'
				def.resolve(service.Items);
			},
			(err) => {
				swal("Information!", err.data, "error");
				def.reject(err);
			}
		);
		return def.promise;
	};

	service.post = function (param) {
		var def = $q.defer();
		$http({
			method: 'POST',
			url: url + 'simpan',
			headers: {
				'Content-Type': undefined
			},
			data: param
		}).then(
			(response) => {
				service.Items = response.data;
				def.resolve(response.data);
			},
			(err) => {
				swal("Information!", err.data, "success");
				def.reject(err);
			}
		);

		return def.promise;
	};
	service.upload = function (param) {
		var def = $q.defer();
		var fd = new FormData();
		fd.append('file', param[0]);
		$http({
			method: 'POST',
			url: url + 'upload',
			headers: {
				'Content-Type': undefined
			},
			data: fd
		}).then(
			(response) => {
				service.Items.logo = response.data;
				def.resolve(response.data);
			},
			(err) => {
				swal("Information!", err.data, "success");
				def.reject(err);
			}
		);

		return def.promise;
	};
	return service;
}