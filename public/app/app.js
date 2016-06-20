angular.module('app', ['ngResource', 'ngRoute', 'ngAnimate', 'angularLocalStorage', 'ngTouch']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {
            auth: function(Auth) {
                return Auth.authorizeCurrentUserForRoute('admin');
            }
        },

        user: {
            auth: function(Auth) {
                return Auth.authorizeAuthenticatedUserForRoute();
            }
        }
    };

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
        templateUrl: '/partials/main/main',
        controller: 'MainController'
    })
        .when('/logout', {
        templateUrl: '/partials/views/logout',
        controller: 'LogoutController'
    })
        .when('/profile', {
        templateUrl: '/partials/views/profile',
        controller: 'ProfileController',
        resolve: routeRoleChecks.user
    })
        .when('/howtofoodtaxi', {
        templateUrl: '/partials/views/howtofoodtaxi'
    })

    .when('/areanotserviced', {
        templateUrl: '/partials/views/areanotserviced',
        controller: 'NotServicedController'
    })
        .when('/checkavailability', {
        templateUrl: '/partials/views/checkavailability',
        controller: 'CheckAvailabilityController'
    })

    .when('/userloginrecovery', {
        templateUrl: '/partials/views/userloginrecovery',
        controller: 'UserLoginRecoveryController'
    })

    .when('/admin/users', {
        templateUrl: '/partials/admin/user-list',
        controller: 'UserListController',
        resolve: routeRoleChecks.admin
    })

    .when('/signup', {
        templateUrl: '/partials/views/signup',
        controller: 'SignupController'
    })

    .when('/recoveraccountinformation', {
        templateUrl: '/partials/views/recoveraccountinformation',
        controller: 'RecoverAccountInformationController'
    })

    .when('/userverificationsuccess', {
        templateUrl: '/partials/views/userverificationsuccess'
    })

    .when('/browse', {
        templateUrl: '/partials/grocery/grocerybrowse',
        controller: 'GroceryBrowseController'
    })

    .when('/shopbyaisle', {
        templateUrl: '/partials/grocery/shopbyaisle',
        controller: 'GroceryBrowseController'
    })

    .when('/cart', {
        templateUrl: '/partials/store/cart',
        controller: 'ViewCartController'
    })

    .when('/storefinder', {
        templateUrl: '/partials/store/storefinder',
        controller: 'StoreFinderController'
    })

    .when('/register', {
        templateUrl: '/partials/views/register',
        controller: 'RegisterController'
    })

    .when('/main', {
        templateUrl: '/partials/views/mainmenu',
        controller: 'MainMenuController'
    })

    .when('/myaccount', {
        templateUrl: '/partials/views/myaccount',
        controller: 'MyAccountController'
    })

    .when('/signin', {
        templateUrl: '/partials/views/signin'
    })
    .when('/order_complete', {
        templateUrl: '/partials/views/order_complete',
        controller: 'PostCheckoutController'
    })

    .when('/validation', {
        templateUrl: '/partials/views/validation'
    })

    .when('/shopmenu', {
        templateUrl: '/partials/grocery/shopmenu'
    })

    .when('/validatecreditcard', {
        templateUrl: '/partials/views/validatecreditcard',
        controller: 'CreditCardController'
    })

    .when('/ccdetails', {
        templateUrl: '/partials/views/ccdetails',
        controller: 'CreditCardController'
    })

    .when('/addnewcc', {
        templateUrl: '/partials/views/addnewcc',
        controller: 'CreditCardController'
    })

    .when('/shoppingmethods', {
        templateUrl: '/partials/grocery/shoppingmethods'
    })

    .when('/user-account-locked', {
        templateUrl: '/partials/account/user-account-locked'
    })


    .when('/verify', {
        templateUrl: '/partials/views/verify',
        //	controller: 'NotServicedController'
    })

    .when('/mock/:templatePath*', {

        templateUrl: function() {
            var path = arguments[0].templatePath;
            return '/partials/mock/' + path;
        },
    })
/*    .when('/shopmeatandseafood', {
        templateUrl: '/partials/grocery/shopmeatandseafood',
    })
*/
;




});

angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});
