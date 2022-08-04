// Multilanguage setup
var lang = get('lang');
if (lang == "en") {
    $scope.texts = texts[0]
    $scope.lang = "en"
} else if (lang == "it") {
    $scope.texts = texts[1]
    $scope.lang = "it"
} else if (lang == "fr") {
    $scope.texts = texts[2]
    $scope.lang = "fr"
} else if (lang == "ar") {
    $scope.texts = texts[3]
    $scope.lang = "ar"
} else if (lang == "gr") {
    $scope.texts = texts[4]
    $scope.lang = "gr"
} else if (lang == "vn") {
    $scope.texts = texts[5]
    $scope.lang = "vn"
} else if (lang == "nl") {
    $scope.texts = texts[6]
    $scope.lang = "nl"
} else if (lang == "pl") {
    $scope.texts = texts[7]
    $scope.lang = "pl"
} else if (lang == "br") {
    $scope.texts = texts[8]
    $scope.lang = "br"
} else if (lang == "ru") {
    $scope.texts = texts[9]
    $scope.lang = "ru"
} else if (lang == "zh") {
    $scope.texts = texts[10]
    $scope.lang = "zh"
} else if (lang == "jp") {
    $scope.texts = texts[11]
    $scope.lang = "jp"
} else {
    var lang = window.navigator.language || window.navigator.userLanguage;
    if (lang.startsWith('it')) {
        $scope.texts = texts[1]
        $scope.lang = "it"
    } else if (lang.startsWith('ar')) {
        $scope.texts = texts[3]
        $scope.lang = "ar"
    } else if (lang.startsWith('fr')) {
        $scope.texts = texts[2]
        $scope.lang = "fr"
    } else if (lang.startsWith('el')) {
        $scope.texts = texts[4]
        $scope.lang = "gr"
    } else if (lang.startsWith('vi')) {
        $scope.texts = texts[5]
        $scope.lang = "vn"
    } else if (lang.startsWith('nl')) {
        $scope.texts = texts[6]
        $scope.lang = "nl"
    } else if (lang.startsWith('pl')) {
        $scope.texts = texts[7]
        $scope.lang = "pl"
    } else if (lang.startsWith('pt')) {
        $scope.texts = texts[8]
        $scope.lang = "br"
    } else if (lang.startsWith('ru')) {
        $scope.texts = texts[9]
        $scope.lang = "ru"
    } else if (lang.startsWith('zh')) {
        $scope.texts = texts[10]
        $scope.lang = "zh"
    } else if (lang.startsWith('jp')) {
        $scope.texts = texts[11]
        $scope.lang = "jp"
    } else {
        $scope.texts = texts[0]
        $scope.lang = "en"
    }
}

lang = $scope.lang

$scope.changeLang = function (field) {
    if (field == 1) {
        $scope.texts = texts[3]
        $scope.lang = "ar"
    } else if (field == 2) {
        $scope.texts = texts[8]
        $scope.lang = "br"
    } else if (field == 3) {
        $scope.texts = texts[0]
        $scope.lang = "en"
    } else if (field == 4) {
        $scope.texts = texts[2]
        $scope.lang = "fr"
    } else if (field == 5) {
        $scope.texts = texts[4]
        $scope.lang = "gr"
    } else if (field == 6) {
        $scope.texts = texts[1]
        $scope.lang = "it"
    } else if (field == 8) {
        $scope.texts = texts[6]
        $scope.lang = "nl"
    } else if (field == 9) {
        $scope.texts = texts[7]
        $scope.lang = "pl"
    } else if (field == 10) {
        $scope.texts = texts[9]
        $scope.lang = "ru"
    } else if (field == 11) {
        $scope.texts = texts[5]
        $scope.lang = "vn"
    } else if (field == 12) {
        $scope.texts = texts[10]
        $scope.lang = "zh"
    } else if (field == 7) {
        $scope.texts = texts[11]
        $scope.lang = "ja"
    }
    lang = $scope.lang
}
