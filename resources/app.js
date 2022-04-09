// $(() => {
//     axios.get("/api").then((res) => {
//         let items = res.data.items;
//         for (var i in items) {
//             let item = items[i];
//             let html = `<li data-item="${item.full_name}">${item.full_name}</li>`;
//             $("#lista").append(html);
//         }
//     });

//     $(document).on("click", "[data-item]", function () {
//         let nomeDoRepositorio = $(this).data("item");
//         if ($(this).data("remove") == true) {
//             let cloned = $(this).clone();
//             cloned.attr("data-remove", false);
//             $("#lista").append(cloned);
//         } else {
//             let cloned = $(this).clone();
//             cloned.attr("data-remove", true);
//             $("#lista-favoritos").append(cloned);
//         }
//         $(this).remove();
//     });
// });

const app = angular.module("app", []);

app.controller("AppController", ($scope, $http) => {


    $http.get('/favoritos').then((res) => {
        $scope.favoritos = res.data;
    })


    $scope.repositories = [];
    $scope.favoritos = [];
    $http.get("/api").then((res) => {
        $scope.repositories = res.data.items;
    });
    $scope.addFavorito = (key) => {
        $scope.favoritos.push($scope.repositories[key]);
        $scope.repositories.splice(key, 1);
    };
    $scope.removeFavorito = (key) => {
        $scope.repositories.push($scope.favoritos[key]);
        $scope.favoritos.splice(key, 1);
    };

    $scope.$watch(
        "favoritos",
        () => {
            if ($scope.favoritos.length > 0) {
                $http
                    .post("/favoritos", {
                        lista: $scope.favoritos//.map((item) => item.full_name),
                    })
                    .then((res) => {})
                    .catch((err) => {});
            }
        },
        true,
    );
});
