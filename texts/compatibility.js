var texts = []

// English
texts.push([
	"Unknown", // 0
	"Crashes", // 1
	"Buggy", // 2
	"Slow", // 3
	"Playable", // 4
	"Nothing", // 5
	"Bootable", // 6
	"Intro", // 7
	"Menu", // 8
	"Ingame -", // 9
	"Ingame +", // 10
	"All", // 11
	"Home Page", // 12
	"Homebrew Compatibility List", // 13
	"Tags", // 14
	"Homebrew that crash the emulator.", // 15
	"Homebrew that work with bugs or glitches.", // 16
	"Homebrew that work but have very poor framerate.", // 17
	"Homebrew that are perfectly playable.", // 18
	"Entry Name", // 19
	"Status", // 20
	"PlayStation and PS Vita are trademarks of Sony Interactive Entertainment Inc.", // 21
	"The emulator is not related to or endorsed by Sony, or derived from confidential materials belonging to Sony.", // 22
	"Logo by", // 23
	"Search", // 24
	"Select Language", // 25
	"Compatibility List", // 26
	"Games that don't boot at all, not displaying an initial black screen with a FPS counter.", // 27
	"Games that boot but display nothing more than a black screen with a FPS counter.", // 28
	"Games that display any image on screen but doesn't reach to menus.", // 29
	"Games that get into menu but can't enter Ingame.", // 30
	"Games that go ingame but have major issues that prevents it from going further early on.", // 31
	"Games that go far ingame but have glitches that render the game unplayable or have non-playable performance.", // 32
	"Games that can be played from start to finish with playable performance and no game breaking glitches.", // 33
	"The emulator is currently undergoing great changes of its backend which are greatly improving compatibility with games. \
	This compatibility list doesn't reflect the state of the emulator anymore and everyone interested in the emulator is \
	encouraged to re-test their games with the latest emulator builds every few weeks to update the compatibility reports." // 34
])

// Italian (translation provided by Rinnegatamante)
texts.push([
	"Sconosciuto", // 0
	"Crasha", // 1
	"Buggato", // 2
	"Lento", // 3
	"Giocabile", // 4
	"Niente", // 5
	"Avviabile", // 6
	"Intro", // 7
	"Menu", // 8
	"In Gioco -", // 9
	"In Gioco +", // 10
	"Tutti", // 11
	"Pagina Principale", // 12
	"Lista di Compatibilità Homebrew", // 13
	"Tag", // 14
	"Homebrew che crashano l'emulatore.", // 15
	"Homebrew che funzionano con glitch e/o bug.", // 16
	"Homebrew che funzionano ma con un framerate discutibile.", // 17
	"Homebrew che sono perfettamente funzionanti.", // 18
	"Nome", // 19
	"Stato", // 20
	"PlayStation e PS Vita sono marchi registrati di Sony Interactive Entertainment Inc.", // 21
	"L'emulatore non è correlato o certificato da Sony, nè derivato da materiale confidenziale appartenente alla Sony.", // 22
	"Logo creato da", // 23
	"Cerca", // 24
	"Seleziona Lingua", // 25
	"Lista di Compatibilità", // 26
	"Giochi che non si avviano affatto, non visualizzano uno schermo nero iniziale con un contatore FPS.", // 27
	"Giochi che si avviano ma non visualizzano nient'altro che uno schermo nero con un contatore FPS.", // 28
	"Giochi che visualizzano qualsiasi immagine sullo schermo ma non raggiungono i menu.", // 29
	"Giochi che funzionano correttamente ma non possono entrare in gioco.", // 30
	"Giochi che vanno in gioco, ma hanno problemi importanti che impediscono di andare più avanti.", // 31
	"Giochi che vanno in gioco ma hanno problemi che rendono il gioco non riproducibile o hanno prestazioni non riproducibili.", // 32
	"Giochi che possono essere giocati dall'inizio alla fine con prestazioni giocabili e nessun problema di rottura del gioco.", // 33
	"L'emulatore è attualmente in fase di grandi cambiamenti del suo backend che stanno migliorando notevolmente la compatibilità con i giochi. \
	Questa lista di compatibilità non riflette più lo stato dell'emulatore e tutti coloro che sono interessati all'emulatore sono incoraggiati a \
	testare nuovamente i loro giochi con le ultime build dell'emulatore ogni poche settimane per aggiornare i rapporti di compatibilità." // 34 (translated using DeepL)
])

// French (translation provided by Drayano, small correction by Zangetsu38)
texts.push([
	"Inconnu", // 0
	"Crash", // 1
	"Buggé", // 2
	"Lent", // 3
	"Jouable", // 4
	"Rien", // 5
	"Amorçable", // 6
	"Intro", // 7
	"Menu", // 8
	"En Jeu -", // 9
	"En Jeu +", // 10
	"Tout", // 11
	"Page d'accueil", // 12
	"Liste de Compatibilité Homebrew", // 13
	"Tags", // 14
	"Homebrew qui font crash l'émulateur.", // 15
	"Homebrew qui marchent avec des bugs ou des pépins.", // 16
	"Homebrew qui marchent mais qui ont de très mauvaises performances.", // 17
	"Homebrew qui sont parfaitement jouables.", // 18
	"Nom", // 19
	"Statut", // 20
	"PlayStation et PS Vita sont des marques déposées de Sony Interactive Entertainment Inc.", // 21
	"Vita3K n'est pas lié ou approuvé par Sony, ou dérivé de documents confidentiels appartenant à Sony.", // 22
	"Logo fait par", // 23
	"Rechercher", // 24
	"Choisissez votre langue", // 25
	"Liste de Compatibilité", // 26
	"Jeux qui ne démarrent pas du tout, ne affichant pas un écran noir initial avec un compteur FPS.", // 27
	"Les jeux qui démarrent mais n’affichent rien de plus qu’un écran noir avec un compteur FPS.", // 28
	"Les jeux qui affichent une image à l'écran mais n'atteignent pas les menus.", // 29
	"Des jeux qui fonctionnent correctement mais ne peuvent pas entrer en jeu.", // 30
	"Les jeux qui vont en jeu ont des problèmes majeurs qui l’empêchent d’aller plus loin.", // 31
	"Les jeux qui vont loin dans le jeu, mais ont des problèmes qui rendent le jeu injouable ou ont des performances non jouables.", // 32
	"Des jeux qui peuvent être joués du début à la fin avec des performances jouables sans aucun problème.", // 33
	"L'émulateur subit actuellement de grands changements de son backend qui améliorent considérablement la compatibilité avec les jeux. \
	Cette liste de compatibilité ne reflète plus l'état de l'émulateur et toute personne intéressée par l'émulateur est \
	encouragés à re-tester leurs jeux avec les dernières versions de l'émulateur toutes les quelques semaines pour mettre à jour les rapports de compatibilité." // 34
])

// Arabic (translation provided by IllusionMan1212)
texts.push([
	"غير معروف", //0
	"يغلق", // 1
	"عطل", // 2
	"بطيئ", // 3
	"ممتاز", // 4
	"لا شيئ", // 5
	"قابل للبدء", // 6
	"فاتحة", // 7
	"تظهر القائمة", // 8
	"تدخل اللعبة -", // 9
	"تدخل اللعبة +", // 10
	"الكل", // 11
	"الصفحة الرئيسية", // 12
	"قائمة توافق الالعاب المنزلية", // 13
	"الشارات", // 14
	"الالعاب التي تغلق البرنامج", // 15
	"الالعاب التي تعمل في وجود اعطال", // 16
	"الالعاب التي تعمل بسرعة بطيئة", // 17
	"الالعاب التي تعمل بسرعة ممتازة", // 18
	"الاسم", // 19
	"الحالة", // 20
	"PlayStation و PS Vita هما علامتان تجاريتان لشركة Sony Interactive Entertaintment Inc.", // 21
	"المحاكي غير مرتبط او مؤيد من Sony, او مأخوذ من مستندات سرية تنتمي الى Sony", // 22
	"الشعار من قبل", // 23
	"البحث", // 24
	"اختيار اللغة", // 25
	"قائمة التوافق", // 26
	"الالعاب التي لا تعمل على الاطلاق, ولا تعرض شاشة سوداء اولية مع عداد FPS", // 27
	"الالعاب التي تعمل ولكن لا تعرض اكثر من شاشة سوداء مع عداد FPS", // 28
	"الالعاب التي تعرض اي صورة على الشاشة ولكنها لا تصل الى القوائم", // 29
	"الألعاب التي تعمل بشكل صحيح ولكن لا يمكنها ان تدخل داخل اللعبة", // 30
	"الالعاب التي تدخل داخل اللعبة ولكن لديها مشاكل كبيرة تمنعها من المضي قدماً في وقت مبكر", // 31
	"الالعاب التي تدخل داخل اللعبة ولكن بها اعطال تجعل اللعبة غير قابلة للعب او تكون ذات اداء غير قابل للعب", // 32
	"الألعاب التي يمكن لعبها من البداية إلى النهاية بأداء قابل للعب وعدم وجود أي خلل في اللعبة", // 33
	"هذا المحاكي يخضع لتغييرات كبيرة حاليا لتحسين توافق الألعاب.\
	قائمة التوافق هذه لم تعد تعكس حالة المحاكي بعد الآن ونحن ننصح كل\
	 المهتمين بالمحاكي أن يعيدوا تجريب ألعابهم مع الإصدارات الجديدة كل عدة أسابيع لتحديث تقارير التوافق.", // 34
])

// Greek (translation by VelocityRa)
texts.push([
	"Άγνωστο", // 0
	"Κρασάρει", // 1
	"Προβληματικό", // 2
	"Αργό", // 3
	"Παίζεται", // 4
	"Τίποτα", // 5
	"Εκκίνηση", // 6
	"Intro", // 7
	"Μενού", // 8
	"στο παιχνίδι -", // 9
	"στο παιχνίδι +", // 10
	"Όλα", // 11
	"Αρχική σελίδα", // 12
	"Homebrew Λίστα συμβατότητας", // 13
	"Ετικέτες", // 14
	"Homebrew που κρασάρουν τον εξομοιωτή.", // 15
	"Homebrew που λειτουργούν με σφάλματα ή δυσλειτουργίες", // 16
	"Homebrew που δουλεύουν αλλά είναι πολύ αργά.", // 17
	"Homebrew που δουλεύουν τέλεια.", // 18
	"Όνομα", // 19
	"Κατάσταση", // 20
	"Το PlayStation και το PS Vita είναι εμπορικά σήματα της Sony Interactive Entertainment Inc.", // 21
	"Ο εξομοιωτής δεν σχετίζεται με την Sony ούτε προέρχεται από εμπιστευτικά υλικά που ανήκουν στη Sony.", // 22
	"Λογότυπο από", // 23
	"Αναζήτηση", // 24
	"Επιλογή γλώσσας", // 25
	"Λίστα συμβατότητας", // 26
	"Παιχνίδια που δεν εκκινούν καθόλου και δεν εμφανίζουν αρχική μαύρη οθόνη με μετρητή FPS.", // 27
	"Παιχνίδια που εκκινούν αλλά δεν εμφανίζουν τίποτα περισσότερο από μια μαύρη οθόνη με μετρητή FPS.", // 28
	"Παιχνίδια που εμφανίζουν οποιαδήποτε εικόνα στην οθόνη, αλλά δεν φτάνουν στα μενού.", // 29
	"Παιχνίδια που λειτουργούν σωστά, αλλά δεν μπορούν να εισέλθουν στην Ingame.", // 30
	"Παιχνίδια που πηγαίνουν στο παιχνίδι, αλλά έχουν σημαντικά ζητήματα που εμποδίζουν την περαιτέρω εξέλιξη.", // 31
	"Παιχνίδια που πηγαίνουν πολύ στο παιχνίδι, αλλά έχουν δυσλειτουργίες που καθιστούν το παιχνίδι ακατάλληλο για αναπαραγωγή ή δεν έχουν δυνατότητα αναπαραγωγής.", // 32
	"Παιχνίδια που μπορούν να παιχτούν από την αρχή μέχρι το τέλος με δυνατότητα αναπαραγωγής και δυσλειτουργίες.", // 33
	"Ο εξομοιωτής υφίσταται επί του παρόντος μεγάλες αλλαγές στο backend του, οι οποίες βελτιώνουν σημαντικά τη συμβατότητα με τα παιχνίδια. Αυτή η λίστα συμβατότητας \
	δεν αντικατοπτρίζει πλέον την κατάσταση του εξομοιωτή και όλοι όσοι ενδιαφέρονται για τον εξομοιωτή ενθαρρύνονται να δοκιμάζουν εκ νέου τα παιχνίδια τους με τα τελευταία \
	builds του εξομοιωτή κάθε λίγες εβδομάδες για να ενημερώνονται οι αναφορές συμβατότητας." // 34 (translated using DeepL)
])

// Vietnamese (translation provided by Bentokun)
texts.push([
	"Không rõ", // 0
	"Treo", // 1
	"Nhiều lỗi", // 2
	"Chậm", // 3
	"Chơi được", // 4
	"Không có gì", // 5
	"Khả năng khởi động", // 6
	"Intro", // 7
	"Thực đơn", // 8
	"Trong game -", // 9
	"Trong game +", // 10
	"Tất cả", // 11
	"Trang chủ", // 12
	"Danh sách tương thích homebrew", // 13
	"Tags", // 14
	"Homebrew làm trình giả lập bị treo.", // 15
	"Homebrew chạy được nhưng nhiều lỗi.", // 16
	"Homebrew chạy được nhưng framerate thấp", // 17
	"Homebrew chơi được bình thường.", // 18
	"Tên trò chơi", // 19
	"Trạng thái", // 20
	"Playstation và PS Vita đều là thương hiệu của Sony Interactive Entertainment Inc.", // 21
	"Trình giả lập không liên quan hay được xác nhận bởi Sony, không dựa trên nền tảng những chương trình hay tài liệu mật thuộc về Sony.", // 22
	"Logo bởi", // 23
	"Tìm kiếm", // 24
	"Chọn ngôn ngữ", // 25
	"Danh sách tương thích", // 26
	"Các trò chơi hoàn toàn không khởi động, không hiển thị màn hình đen ban đầu với bộ đếm FPS.", // 27
	"Các trò chơi khởi động nhưng không hiển thị gì ngoài màn hình đen với bộ đếm FPS.", // 28
	"Các trò chơi hiển thị bất kỳ hình ảnh nào trên màn hình nhưng không đến được menu.", // 29
	"Các trò chơi hoạt động đúng nhưng không thể vào Ingame.", // 30
	"Các trò chơi đi vào ingame nhưng có vấn đề lớn ngăn cản nó tiến xa hơn.", // 31
	"Các trò chơi đi vào ingame nhưng có trục trặc khiến trò chơi không thể chơi được hoặc có hiệu suất không thể chơi được.", // 32
	"Các trò chơi có thể được chơi từ đầu đến cuối với hiệu suất có thể chơi và không có sự cố nào xảy ra.", // 33
	"Trình giả lập hiện đang trải qua những thay đổi lớn về phần phụ trợ của nó, giúp cải thiện đáng kể khả năng tương thích với các trò chơi. \
	Danh sách khả năng tương thích này không phản ánh trạng thái của trình giả lập nữa và mọi người quan tâm đến trình giả lập được khuyến khích \
	kiểm tra lại trò chơi của họ với các bản dựng trình giả lập mới nhất vài tuần một lần để cập nhật báo cáo tương thích. " // 34 (translated using Google Translate)
])

// Dutch (Translation provided by jelle619)
texts.push([
	"Onbekend", // 0
	"Crasht", // 1
	"Buggy", // 2
	"Langzaam", // 3
	"Speelbaar", // 4
	"Niets", // 5
	"Bootable", // 6
	"Intro", // 7
	"Menu", // 8
	"In het spel -", // 9
	"In het spel +", // 10
	"Alles", // 11
	"Home Page", // 12
	"Homebrew Compitabiliteitslijst", // 13
	"Tags", // 14
	"Homebrew dat de emulator laat crashen.", // 15
	"Homebrew dat met bugs of glitches werkt.", // 16
	"Homebrew dat werkt, maar met een lage framerate.", // 17
	"Homebrew dat perfect speelbaar is.", // 18
	"Naam", // 19
	"Status", // 20
	"PlayStation en PS Vita zijn handelsmerken van Sony Interactive Entertainment Inc.", // 21
	"Deze emulator wordt niet ondersteund en staat los van Sony en is niet afgeleid van vertrouwelijk materiaal in het bezit van Sony.", // 22
	"Logo door", // 23
	"Zoeken", // 24
	"Selecteer Taal", // 25
	"Compitabiliteitslijst", // 26
	"Spellen die helemaal niet opstarten, geen eerste zwart scherm weergeven met een FPS-teller.", // 27
	"Spellen die opstarten maar niets meer laten zien dan een zwart scherm met een FPS-teller.", // 28
	"Spellen die elke afbeelding op het scherm weergeven, maar die geen bereik hebben naar menu's.", // 29
	"Spellen die goed werken maar Ingame niet kunnen betreden.", // 30
	"Spellen die ingame zijn, maar grote problemen hebben die het onmogelijk maken om verder te gaan.", // 31
	"Spellen die ingame zijn, maar glitches hebben die de game onspeelbaar maken of slechte prestaties leveren.", // 32
	"Spellen die van begin tot eind kunnen worden gespeeld met speelbare prestaties en geen spelvervelende glitches.", // 33
	"De emulator ondergaat momenteel vele aanpassingen die spelcompatibiliteit moeten doen verbeteren. Deze lijst van \
	compatibiliteiten geeft niet langer een juist beeld van de huidige emulatiestaat. Eenieder die interesse heeft in de \
	emulator, wordt geadviseerd om hun games elke paar weken opnieuw te testen met de laatste build van de emulator, om \
	zo de compatibiliteitenrapporten up-to-date te houden." // 34
])

// Polish (Translation provided by circl, corrected by kacek, and once again fixed by HackZy)
texts.push([
	"Nieznane", // 0
	"Niestabilne", // 1
	"Błędy", // 2
	"Powolne", // 3
	"Grywalne", // 4
	"Nic", // 5
	"Uruchamialne", // 6
	"Intro", // 7
	"Menu", // 8
	"W grze -", // 9
	"W grze +", // 10
	"Wszystkie", // 11
	"Strona główna", // 12
	"Lista kompatybilności Homebrew", // 13
	"Tagi", // 14
	"Homebrew, które powoduje zatrzymanie emulatora.", // 15
	"Homebrew, które mają błędy i awarie.", // 16
	"Homebrew, które działają ze słabą wydajnością", // 17
	"Homebrew, które działają perfekcyjnie.", // 18
	"Nazwa Gry", // 19
	"Status", // 20
	"PlayStation and PS Vita są znakami towarowymi Sony Interactive Entertainment Inc.", // 21
	"Emulator nie jest powiązany z firmą Sony, nie jest przez nią wspierany ani nie korzysta z poufnych materiałów należących do firmy Sony.", // 22
	"Logo stworzone przez", // 23
	"Szukaj", // 24
	"Wybierz język", // 25
	"Lista kompatybilności", // 26
	"Gry, które się nie uruchamiają ani nie wyświetlają początkowego czarnego ekranu z licznikiem FPS.", // 27
	"Gry, które uruchamiają się, ale wyświetlają tylko czarny ekran z licznikiem FPS.", // 28
	"Gry, które wyświetlają jakiś obraz na ekranie, ale nie docierają do menu głównego.", // 29
	"Gry, które docierają do menu, ale nie umożliwiają rozgrywki", // 30
	"Gry, w które można zagrać, ale mają poważne problemy, które uniemożliwiają kontynuowanie gry.", // 31
	"Gry, w które można zagrać, ale w trakce rozgrywki występują błędy, które sprawiają, że gra jest nie do odzyskania lub działa nieprawidłowo.", // 32
	"Gry, w które można zagrać od początku do końca, z przeciętną wydajnością i brakiem zakłóceń.", // 33
	"Emulator przechodzi obecnie wielkie zmiany w swoim backendzie, które znacznie poprawiają kompatybilność z grami. \
	Lista kompatybilności nie odzwierciedla stanu emulatora i wszystkich zainteresowanych emulatorem zachęcamy do ponownego \
	przetestowania swoich gier z najnowszymi wersjami emulatora co parę tygodni w celu aktualizacji raportów kompatybilności." // 34
])

// Brazilian Portuguese (Translation provided by mjsf12)
texts.push([
	"Desconhecido", // 0
	"Quebrando", // 1
	"Bugado", // 2
	"Lento", // 3
	"Jogável", // 4
	"Nada", // 5
	"Inicializável", // 6
	"Intro", // 7
	"Menu", // 8
	"No jogo -", // 9
	"No jogo +", // 10
	"Todos", // 11
	"Pagina Inicial", // 12
	"Lista de Compatibilidade de Homebrew", // 13
	"Marcadores", // 14
	"A Homebrew quebra o emulador.", // 15
	"A Homebrew funciona com bugs ou falhas.", // 16
	"A Homebrew funciona, mas com baixos quadros por segundo.", // 17
	"A Homebrew é perfeitamente jogável.", // 18
	"Nome da entrada", // 19
	"Estado", // 20
	"PlayStation e PS Vita são marcas registradas da Sony Interactive Entertainment Inc. ", // 21
	"O emulador não é relacionado com ou endossado pela Sony ou derivado de materiais confidenciais pertencentes a Sony.", // 22
	"Logo por", // 23
	"Procurar", // 24
	"Selecione o Idioma", // 25
	"Lista de Compatibilidade", // 26
	"Jogos que não inicializam, não exibem uma tela preta inicial com um contador de FPS.", // 27
	"Jogos que inicializam, mas exibem nada mais do que uma tela preta com um contador de FPS.", // 28
	"Jogos que exibem qualquer imagem na tela, mas não alcançam os menus.", // 29
	"Jogos que funcionam corretamente, mas não podem entrar no jogo.", // 30
	"Jogos que vão no jogo, mas têm grandes problemas que o impedem de ir mais longe.", // 31
	"Jogos que vão longe no jogo mas têm falhas que tornam o jogo impossível de jogar ou têm um desempenho não jogável.", // 32
	"Jogos que podem ser jogados do início ao fim com desempenho jogável e sem falhas no jogo.", // 33
	"O emulador está atualmente passando por grandes mudanças de seu backend que estão melhorando muito a compatibilidade com os jogos. \
	Esta lista de compatibilidade não reflete mais o estado do emulador e todos os interessados no emulador são encorajados a testar \
	novamente seus jogos com os mais recentes emuladores construídos a cada poucas semanas para atualizar os relatórios de compatibilidade." // 34 (translated using DeepL)
])

// Russian (Translation provided by Dum4G, Kane)
texts.push([
	"Неизвестно", // 0
	"Вылетает", // 1
	"Забагованные", // 2
	"Медленно", // 3
	"Играбельно", // 4
	"Не запускается", // 5
	"Запускается", // 6
	"Заставка", // 7
	"Меню", // 8
	"В игре -", // 9
	"В игре +", // 10
	"Все", // 11
	"На главную", // 12
	"Homebrew список совместимости", // 13
	"Теги", // 14
	"Homebrew приложения, которые приводят к вылету эмулятора.", // 15
	"Homebrew приложения, которые работают с багами или глюками.", // 16
	"Homebrew приложения, которые запускаются с крайне низкой частотой кадров.", // 17
	"Homebrew приложения, которые идеально работают.", // 18
	"Название", // 19
	"Состояние", // 20
	"Торговые марки PlayStation и PS Vita принадлежат Sony Interactive Entertainment Inc.", // 21
	"Эмулятор не связан с компанией Sony, не поддерживается ею и не основан на конфиденциальных материалах, принадлежащих Sony.", // 22
	"Логотип от", // 23
	"Поиск", // 24
	"Выберите язык", // 25
	"Список совместимости", // 26
	"Игры, которые вообще не загружаются и не отображают черный экран со счетчиком FPS.", // 27
	"Игры, которые запускаются, но отображают только черный экран со счетчиком FPS.", // 28
	"Игры, которые способные вывести изображение на экран, но не доходящие до меню.", // 29
	"Игры, способные отобразить меню, но не позволяющие начать игру.", // 30
	"Игры, которые запускаются, но прохождение которых невозможно из-за серьезных проблем.", // 31
	"Игры, полное прохождение которых затруднено из-за неполадок в работе или проблем с производительностью.", // 32
	"Игры, проходимые от начала до конца с хорошей производительностью и без каких-либо проблем.", // 33
	"Эмулятор в настоящее время претерпевает множество изменений в своем коде, которые значительно улучшают производительность в играх. \
	Этот список совместимости больше не отражает текущее состояние эмулятора, и всем, кто интересуется эмулятором, рекомендуется повторно \
	тестировать свои игры с последними сборками эмулятора каждые несколько недель, чтобы обновлять отчеты о совместимости." // 34
])

// Simplified Chinese (Translation provided by Hikaruchang, corrected by Croden1999)
texts.push([
	"未知", // 0
	"崩溃", // 1
	"存在错误", // 2
	"缓慢", // 3
	"可玩", // 4
	"无法启动", // 5
	"可引导", // 6
	"有图像", // 7
	"可进入菜单", // 8
	"可进入游戏-", // 9
	"可进入游戏+", // 10
	"全部", // 11
	"主页", // 12
	"自制程序兼容性列表", // 13
	"标签", // 14
	"使模拟器崩溃的自制程序", // 15
	"带有错误或者故障的自制程序", // 16
	"自制程序可运行但帧数很低", // 17
	"完美可玩的自制程序", // 18
	"条目名称", // 19
	"状态", // 20
	"PlayStation 和 PS Vita 是 Sony Interactive Entertainment Inc.（索尼互动娱乐有限公司）的注册商标。", // 21
	"此模拟器与索尼公司无关，也没有获得索尼公司的认可，更没有包含索尼公司的机密资料。", // 22
	"LOGO设计由", // 
	"搜索", // 24
	"选择语言", // 25
	"兼容性列表", // 26
	"游戏无法启动，甚至没有FPS帧数显示的初始化黑屏状态。", // 27
	"游戏可启动但只显示带有FPS帧数的黑屏状态。", // 28
	"游戏有图像显示但无法进入菜单。", // 29
	"游戏运行正常但无法正常游玩。", // 30
	"游戏可进入游戏中，但却存在阻碍其在早期进展的主要问题。", // 31
	"游戏可进入游戏中游玩的时间更长，但有故障导致游戏不可玩或无法游玩的表现。", // 32
	"游戏可以从头玩到尾，完全可玩的表现，并且没有中断游戏的故障。", // 33
	"模拟器目前正在对其后端进行重大更改，这极大改进了与游戏的兼容性。\
	此兼容性列表不再反映模拟器的状态，我们鼓励每个对模拟器感兴趣的人，\
	每隔几周使用最新版本的模拟器重新测试这些游戏，并更新兼容性报告。" // 34
])

// Japanese (Translation provided by nishinji)
texts.push([
	"不明", // 0
	"クラッシュ", // 1
	"バグ", // 2
	"低速", // 3
	"プレイ可能", // 4
	"プレイ不可能", // 5
	"起動可能", // 6
	"イントロ", // 7
	"メニュー", // 8
	"プレイ開始 -", // 9
	"プレイ開始 +", // 10
	"すべて", // 11
	"ホームページ", // 12
	"自作ソフト互換性リスト", // 13
	"タグ", // 14
	"エミュレータをクラッシュさせる自作ソフト", // 15
	"バグや不具合があるが動作する自作ソフト", // 16
	"動作はするがフレームレートが非常に低い自作ソフト", // 17
	"完全にプレイ可能な自作ソフト", // 18
	"名前", // 19
	"ステータス", // 20
	"PlayStation・PS Vitaは株式会社ソニー・インタラクティブエンタテインメントの商標です。", // 21
	"このエミュレータはソニーとは無関係であり、ソニーが保証するものでもなく、ソニーに帰属する機密資料から派生したものでもありません。", // 22
	"Logo by", // 23
	"検索", // 24
	"言語を選択", // 25
	"互換性リスト", // 26
	"FPSカウンターのある初期画面を表示せず、全く起動しないゲーム", // 27
	"起動はするが、FPSカウンター付きの黒い画面しか表示されないゲーム", // 28
	"画像が表示されるが、メニューまで到達しないゲーム", // 29
	"正常に動作するがゲームを開始できないゲーム", // 30
	"ゲームを開始できるが、序盤に大きな問題があって先に進めないゲーム", // 31
	"ゲームを開始できるが、不具合でゲームが遊べない、または遊べないパフォーマンスのゲーム",// 32
	"最初から最後までプレイ可能で、ゲームを壊すような不具合がないゲーム", // 33
	"現在、エミュレータのバックエンドを大幅に変更し、ゲームとの互換性を大幅に向上させています。\
	この互換性リストはエミュレータの最新の状態を反映したものではなく、エミュレータに興味をお持ちの皆様は、\
	数週間ごとに最新版のエミュレータでゲームをテストし、互換性レポートの更新に参加することをお勧めします。" // 34
])

// Indonesia (Translation provided by ikhoeyZX)
texts.push([
    "Tidak diketahui", // 0
    "Tidak berfungsi", // 1
    "Bermasalah", // 2
    "Lambat", // 3
    "Dapat dimainkan", // 4
    "Tidak ada", // 5
    "Masuk saja", // 6
    "Judul saja", // 7
    "Menu", // 8
    "Dalam permainan -", // 9
    "Dalam permainan +", // 10
    "Semua", // 11
    "Halaman Utama", // 12
    "Daftar dukungan Homebrew", // 13
    "Tag", // 14
    "Homebrew yang membuat emulator gagal berfungsi", // 15
    "Homebrew yang dapat berfungsi tapi memiliki masalah bug atau ganguan lainnya.", // 16
    "Homebrew yang dapat berfungsi tapi performa terlalu lambat.", // 17
    "Homebrew yang dapat berfungsi tanpa masalah.", // 18
    "Nama Masukan", // 19
    "Kondisi", // 20
    "PlayStation dan PS Vita merupakan merek dagang dari Sony Interactive Entertainment Inc.", // 21
    "Emulator ini tidak berkaitan atau didukung oleh Sony atau berasal dari konten rahasia yang dimiliki oleh Sony.", // 22
    "Dilabeli oleh", // 23
    "Cari", // 24
    "Pilih bahasa", // 25
    "Daftar dukungan", // 26
    "Permainan yang tidak dapat dimainkan sama sekali, tidak muncul layar hitam yang menampilkan Frame Gambar Perdetik (FPS).", // 27
    "Permainan yang dapat berjalan tapi tidak menampilkan apapun selain layar hitam dan Frame Gambar Perdetik (FPS).", // 28
    "Permainan yang dapat menampilkan gambar apapun tapi tidak bisa sampai menu permainan.", // 29
    "Permainan yang dapat masuk menu tapi tidak bisa dimainkan sama sakali.", // 30
    "Permainan yang dapat bisa dimainkan tapi memiliki banyak basalah sehingga tidak dapat dimainkan lebih lanjut.", // 31
    "Permainan yang dapat dimainkan tapi memiliki gangguan gambar yang membuatnya menjadi tidak dapat dimainkan atau memiliki performa yang buruk.", // 32
    "Permainan yang dapat dimainkan mulai dari awal hingga selesai tanpa ada masalah apapun.", // 33
    "Saat ini emulator dalam tahap perubahan data dan infrastruktur yang dimana memberikan daftar pembaruan dukungan permainan. \
    Daftar dukungan ini tidak hanya mencerminkan kondisi emulator saja dan siapapun yang tertarik dengan emulator ini \
    dapat mendukung untuk menguji coba kembali permainan dengan emulator versi terbaru yang rilis setiap minggu untuk memperbarui daftar dukungan permainan." // 34
])

// Traditional Chinese  (Translation by Croden1999)
texts.push([
	"未知", // 0
	"崩潰", // 1
	"存在錯誤", // 2
	"緩慢", // 3
	"可遊玩", // 4
	"无法啟動", // 5
	"可以啟動", // 6
	"有圖像", // 7
	"可進入選單", // 8
	"可進入遊戲-", // 9
	"可進入遊戲+", // 10
	"全部", // 11
	"主頁", // 12
	"自製程式相容性列表", // 13
	"標簽", // 14
	"使模擬器崩潰的自製程式", // 15
	"帶有錯誤或者故障的自製程式", // 16
	"自製程式可運行但幀數很低", // 17
	"完美可玩的自製程式", // 18
	"條目名稱", // 19
	"狀況", // 20
	"PlayStation 和 PS Vita 是 Sony Interactive Entertainment Inc.（索尼互動娛樂有限公司）的注冊商標。", // 21
	"此模擬器與索尼公司無關，也沒有獲得索尼公司的認可，更沒有包含索尼公司的機密資料。", // 22
	"LOGO設計由", // 
	"搜尋", // 24
	"選擇語言", // 25
	"相容性列表", // 26
	"遊戲无法啟動，甚至沒有FPS幀數顯示的初始化黑屏狀況。", // 27
	"遊戲可啟動但只顯示带有FPS幀數的黑屏狀況。", // 28
	"遊戲有圖像顯示但無法進入選單。", // 29
	"遊戲運行正常但無法正常遊玩。", // 30
	"遊戲可進入遊戲中，但卻存在阻礙其在早期進展的主要問題。", // 31
	"遊戲可進入遊戲中遊玩的時間更長，但有故障導致遊戲不可玩或無法遊玩的表現。", // 32
	"遊戲可以從頭玩到尾，完全可玩的表現，並且沒有中斷遊戲的故障。", // 33
	"模擬器目前正在對其後端進行重大更改，這極大改進了與遊戲的相容性。\
	此相容性列表不再反映模擬器的狀況，我們鼓勵每個對模擬器感興趣的人，\
	每隔幾周使用最新版本的模擬器重新測試這些遊戲，並更新相容性匯報。" // 34
])
