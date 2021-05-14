

class AmazonOrdersCrawler {
    
    constructor(props){
        // this.LocalStorageCacheKey = this.LocalStorageCacheKey;
        this.LocalStorageCacheKey = "taxbutler";
        this.SetTaxButlerCache = this.SetTaxButlerCache.bind(this);

        this.chosenPieces = [];
        this.chosenPrices = [];
        this.Preloaded = false;
        this.SkipOrder = false;
        this.PCPart = ["Windows", "USB", "Mac", "DRAM", "DDR4", "Noctua", "Fan", "Processor", "Motherboard", "LGA1", "HDMI", "Raspberry", "Breadboard", "Cable", "Arduino", "Threaded", "Brass", "Solder", "OLED"
        , "Smooth-On", "LED", "Battery", "Fastener", "Magnet", "Electric wire", "Soldering", "5V", "12V","3V","3.3V", "3D Printer", "Printer", "M5", "M6", "RGB", "Mouse", "M6", "trash"];
        this.HomeOffice = ["Paper", "Printer paper", "Three-hole punched paper", "Graph paper", "Tracing paper", "Carbon paper", "Color card stock", "Heavy-duty card stock", "Wrapping paper", "Greeting cards and envelopes", "Business cards", "Letterhead", "Envelopes and Boxes", "envelope", "Legal envelopes", "Padded legal envelope mailers", "Postage stamps", "Envelope sealer", "Packaging bubble", "Cardboard boxes", "Notebooks and Notepads", "Composition notebooks", "Spiral-bound notebooks", "Legal pads", "Steno pads", "Binder Items", "Binders", "Binder tabs", "Binder pockets", "Clear binder document holders", "Hole puncher", "Three-hole puncher", "Filing Cabinet", "Manila folders", "Hanging folders", "Folder tabs", "Small Office Supplies", "Stapler", "Staples", "Stapler remover", "Scissors", "Box cutter", "Paperclips", "Binder clips", "Clear cellophane tape dispenser", "Clear cellophane tape", "Masking tape", "Packing tape", "Duct tape", "Sticky notes", "Bookmark sticky flags", "Bookmarks", "White glue", "Rubber cement", "Tacky wall mount gum", "Hanging hooks", "Magnifying glass", "Writing Implements", "Pencils", "Pencil sharpener", "Mechanical pencils", "Mechanical pencil lead refills", "Erasers", "Pens", "Black all-purpose markers", "Highlighters", "Rubber stamps", "Ink pad", "Correction fluid", "Dry erase board", "Dry erase markers", "Dry erase spray", "Ruler", "Protractor", "Compass", "T-square", "Office Storage", "Bookends", "Paperweight", "Magazine holders", "Bulletin board", "Pushpins", "Letter opener", "Pen holder", "In/Out box", "Document sorter/holder", "Supply trays and containers", "Electrical Items", "Computer and monitor", "Keyboard", "Mouse", "Printer", "Toner or print cartridges", "Telephone", "Speakerphone", "Headset", "Postage meter", "Projection device", "Photocopier", "Digital camera", "Lamps", "Label maker", "Laminating machine", "Scanner", "Fax machine", "Shredder", "Extension cords", "Surge protectors", "Miscellaneous", "First-aid kit", "Flashlight", "Fire extinguisher", "Disinfectant wipes", "Hand sanitizer", "Window cleaner", "Paper toweling", "Facial tissues", "Broom", "Dustpan", "Vacuum cleaner", "Garbage bags", "Twine", "Batteries", "Shredder oil", "Computer screen and keyboard cleaner", "Pressured air", "Open/Close sign to hang on exterior door", "Furniture", "Desk", "Chairs", "Filing cabinets", "Tables", "Bookcases", "Shelves", "Safe", "Waste basket","Home Office", "Office", "Solder", "Pen", "Light Bulb", "Outlet", "Paper", "A4", "Bento", "Bowls", "Glasses"];
        this.LivingExpenses = ["HOUSE TOURS", "House Tours", "Apartments", "Houses", "Studio Apartments", "Tiny Homes", "More", "New York City", "Los Angeles", "Chicago", "London", "San Francisco", "STYLE", "Style", "Living Rooms", "Bedrooms", "Kitchens", "Bathrooms", "Patios", "Decorating Ideas", "Design Trends", "Color", "Entryways", "Hacks", "Paint", "Cleaning", "Easy DIYs", "Weekend Projects", "Pest Control", "Home Security", "Heating & Cooling", "How to Style Houseplants", "Houseplant Encyclopedia", "Easiest Houseplants to Grow", "Best Indoor Trees", "How to Grow an Avocado Plant", "How to Grow a Money Tree", "Indoor Garden Ideas", "Growing Hydroponic Plants in Water", "ORGANIZE & CLEAN", "Organize & Clean", "Disinfecting", "Decluttering", "Organizing & Storage", "Cleaning Tips", "Laundry Tips", "Natural Cleaner Recipes", "White Vinegar Uses", "Lemon Uses", "Apple Cider Vinegar Uses", "Tea Tree Oil Uses", "Mosquitoes", "Drain Flies", "Roaches", "Ants", "Mice", "LIVING", "Living", "Moving", "Home Financing", "Resources for Renters", "First-Time Home Buyers", "Property Crush", "Budgeting Hacks", "Saving & Investing", "Budget Living", "Career", "Home for the Holidays", "Intentional Living", "Family", "Pets", "Wellness", "Green Living", "Entertaining", "SHOP", "Shop", "Storage", "Kitchen", "Bathroom", "Living Room", "Bedroom", "Rugs", "Tabletop", "Lighting", "Furniture", "Sofas", "Tables", "Chairs", "Mid-century Modern", "Modern", "Rustic", "Industrial", "Scandinavian", "MORE", "Real Estate", "News", "Partner Content", "Partner with Us", "About", "Contact", "Terms of Use", "Privacy Policy", "Jobs", "Team", "How-To", "Marie Kondo", "Plant Doctor", "Taryn Cleans It All", "The New Homesmiths", "$32 Design Challenge", "Adorable Animation", "flathead screwdriver", "Phillips head screwdriver", "Pliers", "An electric screwdriver or power drill", "hammer", "Measuring tape", "Level", "An assortment of nails", "Extra screws, nuts, and bolts", "tool box", "step ladder", "boxcutter", "Duct tape", "Transparent tape", "Electrical tape", "Oil and water-displacing spray", "WD-40", "Dish cloths", "dish scrub brush", "sponge", "drying rack", "Pot holders", "oven mitts", "skillet", "measuring cup", "Measuring spoons", "Cutlery", "Paring knife", "Cutting board", "baking pan", "nonstick saucepan and lid", "pot", "Drinking glasses", "Dinner plates", "Dinner bowls", "mixing bowl", "colander", "can opener", "bottle opener/corkscrew", "whisk", "cooking spoon", "Food storage containers", "Ice cube trays", "toaster", "coffee maker", "Coffee mugs", "kettle", "Hand mixe", "Baking sheet", "All-purpose cleaner", "Disinfecting wipes", "Window cleaner", "hand duster", "detail brush", "scrub brush", "good cleaning cloth", "blue huck surgical towels", "utility belt", "storage caddy", "vacuum", "broom and dustpan", "mop", "Rubber gloves", "plunger", "toilet brush", "comfortable place to sit", "coffee/side table", "mattress", "bed frame", "good pillow", "Bath towels", "Hand towels", "Soft bed sheets", "blanket or comforter", "bathmat", "flower vase", "Coasters", "Window treatments", "clock", "full-length mirror", "place to hang your heavy coats", "filing system", "Something to write on", "place to write on", "Bedside storage", "not a nightstand", "trash can", "laundry hamper", "Smoke alarm", "Carbon monoxide detector", "Emergency candles", "Matches", "First-aid kit", "finger splint", "Band-aids", "Gauze", "flashlight", "Ibuprofen", "Aspirin", "hand-crank", "solar-powered phone charger", "fire extinguisher", "An umbrella", "LifeStraw", "Canned food","Olive Oil", "Forehad", "Nails", "Plant", "Goldfish", "Cofee", "AT&T", "Home Depot", "Magic Candle Company"];
        this.VideoGames = ["Steam", "Xbox", "PS", "Nintendo", "Sony", "Nintendo Switch", "Valve", "Electronic Arts", "Sony Interactive", "Facebook", "Humble Bundle", "Active independently","Active as subsidiary","Defunct and no longer active","0verflow","11 bit studios","1C Company","1-Up Studio","2K Czech","2K","343 Industries","38 Studios","3D Realms","42 Entertainment","4A Games","5th Cell","989 Studios","Acclaim Entertainment","Acclaim Studios Austin","Accolade","Access Games","Access Software","ACE Team","Aces Studio","Acquire","Action Forms","Active Gaming Media","Activision","Adventure Soft","Akella","Alfa System","AlphaDream","Amazon Game Studios","Amazon Game Studios, Orange County (formerly Double Helix Games)","Ambrella","Amusement Vision","Ancient","Anino","Ankama Games","Appy Entertainment","AQ Interactive","Aquria","Arc System Works","Arcane Kids","Arcen Games","Arkane Studios","Arkedo Studio","ArenaNet","Arika","Art Co., Ltd","Artech Digital Entertainment","Artdink","ArtePiazza","Artificial Studios","Artoon","Arzest","Ascaron","Asobo Studio","Aspyr","Atari Interactive (formerly Hasbro Interactive)","Atlus","Atomic Planet Entertainment","Attic Entertainment Software","Avalanche Studios Group","Aventurine SA","Babaroga","Backflip Studios","Bandai Namco Entertainment\nBandai Namco Studios","Bauhaus Entertainment","B.B. Studio","Beenox","Behaviour Interactive","Behaviour Santiago","Bethesda Game Studios","Big Blue Bubble","Big Finish Games","Big Huge Games","BioWare","The Bitmap Brothers","Best Way","Bits Studios","Bizarre Creations","Black Forest Games","Black Isle Studios","Black Rock Studio","Black Wing Foundation","Blitz Games Studios","Blizzard Entertainment","Bloober Team","Bluepoint Games","Blueside","Blue Fang Games","Blue Tongue Entertainment","Bluehole","Bohemia Interactive","Boss Fight Entertainment","Boss Key Productions","BreakAway Games","Brøderbund","Bugbear Entertainment","Bullfrog Productions","Bungie","Camelot Software Planning","Capcom","Capcom Vancouver","Carbine Studios","Cattle Call","Cauldron","Cave","Cavia","CCP Games","CD Projekt Red","Certain Affinity","Chair Entertainment","Chunsoft","Cing","Clap Hanz","Climax Entertainment","Climax Studios","Clover Studio","Coded Illusions","Codemasters","Coffee Stain Studios","Cohort Studios","Coktel Vision","Colossal Order","Compile Heart","Compulsion Games","Com2uS","Core Design","Crafts & Meister","Crawfish Interactive","Creat Studios","Creative Assembly","Creatures","Criterion Games","Croteam","Cryo Interactive","Culture Brain Excel","Crea-Tech","Cryptic Studios","Crystal Dynamics","Crytek","Crytek UK","Cyan Worlds","Cyanide","CyberConnect2","Cyberlore Studios (Blueline Simulations[9])","CyberStep","Cygames","Dambuster Studios","Danger Close Games","Day 1 Studios","Daybreak Game Company","Deadline Games","Deck13","Deep Silver Volition","Demiurge Studios","DeNA","devCAT Studios (Nexon development 3rd division)","Developer House (Developer House Technology PVT LTD)[13]","Dhruva Interactive","Die Gute Fabrik","Digital Extremes","Digital Eclipse","Digitalmindsoft","Digital Reality","Dimps","Disney Interactive Studios","Dontnod Entertainment","DotEmu","Double Fine Productions","Dynamix","Dovetail Games","The Dovetail Group","EA Black Box","EA Digital Illusions CE (EA DICE)","EA Gothenburg","EA Phenomic","EA Salt Lake","EA Tiburon","EA Vancouver (formerly Distinctive Software)","Eat Sleep Play","Eko Software","Egosoft","Eden Games","Eighting","Electronic Arts","Elemental Games","Engine Software","Ensemble Studios","Epic Games","Epics","Epicenter Studios","Epyx","ESA (formerly Softmax)","Étranges Libellules","Eugen Systems","Eurocom","Evolution Studios","Examu","Eyedentity Games","F4","Facepunch Studios","FarSight Studios","FASA Studio","Fatshark","feelplus","Felistella","Firaxis Games","Firefly Studios","Firesprite","First Star Software","Flagship Studios","Flight-Plan","Flying Wild Hog","Focus Home Interactive","Foundation 9 Entertainment","Fox Digital Entertainment","FoxNext","Frictional Games","Frogwares","Frog City Software","FromSoftware","Frontier Developments","Frozenbyte","FTL Games","FUN Labs","Funcom","FuRyu","Futuremark","Gaijin Entertainment","Game Arts","Game Freak","GameHouse","Gameloft","Gamevil","Ganbarion","Gearbox Software","Geewa","Genius Sonority","Genki","Glu Mobile","Gogii Games","Good-Feel","Granzella","Grasshopper Manufacture","Gravity","Gray Matter Interactive","Gremlin Interactive","Grezzo","Grinding Gear Games","Griptonite Games","GSC Game World","Guerrilla Cambridge","Guerrilla Games","Gunfire Games","GungHo Online Entertainment","Gust","Haemimont Games","HAL Laboratory","Halfbrick","Hanaho","h.a.n.d.","Hangar 13","Harebrained Schemes","Harmonix Music Systems","Headstrong Games","Heartbeat","Heavy Iron Studios","HB Studios","HeroCraft","HexaDrive","High Impact Games","High Moon Studios","High Voltage Software","Hothead Games","Housemarque","Hudson Soft","Human Entertainment","Human Head Studios","Humongous Entertainment","Hyperion Entertainment","Ice-Pick Lodge","id Software","Idea Factory","Idol Minds","Imageepoch","Image & Form","Imagineer","Infinity Ward","Infocom","Incognito Entertainment","Incredible Technologies","indieszero","Innerloop Studios","Insomniac Games","Intelligent Systems","Interplay Entertainment","Introversion Software","inXile Entertainment","IO Interactive","Ion Storm","Ion Storm Austin","Irem","Iron Galaxy Studios","Iron Lore Entertainment","Irrational Games","Ivory Tower","Jadestone Group","Jagex","Jaleco","Jam City","Javaground","Jupiter","JV Games","Kairosoft","Kalypso Media","Kaos Studios","Keen Software House","Kesmai","Kiloo Games","King","Klei Entertainment","Koei Tecmo Games (formerly Koei)","KOG Studios","Kojima Productions","Konami","Kongzhong","Krome Studios","Krome Studios Melbourne","Kuju Entertainment","Kunos Simulazioni","Kush Games","Kuma Reality Games","Kylotonn","Larian Studios","Left Field Productions","Legacy Interactive","Legend Entertainment","Legendo Entertainment","Level-5","Lift London","Limbic Entertainment","Lionhead Studios","Liquid Entertainment","Little Green Men Games","LK Avalon","Llamasoft","Linden Lab","Locomotive Games","Looking Glass Studios","Love-de-Lic","LucasArts","Luma Arcade","Luxoflux","MachineGames","Magenta Software","MAGES.","Majesco Entertainment","Marvelous","Massive Entertainment","Masthead Studios","Matrix Software","Maxis","Mean Hamster Software","Media Molecule","Media.Vision","Mediatonic","MegaZebra","Mercury Steam","Metropolis Software","MicroProse Software","Microsoft Casual Games","Midway Games","Midway Studios – Newcastle","miHoYo","Milestone","Milestone srl","Mimimi Games","Mistwalker","Mitchell Corporation","MLB Advanced Media","Mode 7 Games","Mojang AB","Monolith Productions","Monolith Soft","Monster Games","Monte Cristo","Moon Studios","Motion Twin","MTO","Mythic Entertainment","Nadeo","Namco Tales Studio","Nanobit","NAPS team","Natsume","NaturalMotion","Naughty Dog","NCSoft","NDcube","NDOORS Corporation","Neko Entertainment","Nerve Software","NetDevil","NetDragon Websoft","NetEase","NetherRealm Studios","Neverland","Neversoft","Nevosoft","New World Computing","New World Interactive","Nexon\nNexon Korea","Next Level Games","Niantic","Nibris","Nicalis","Nihon Falcom","Nikita Online","Nimble Giant Entertainment","Ninjabee","Ninja Theory","Nintendo","Nippon Ichi Software","Nival","Nordeus","NovaLogic","Novarama","Now Production","Nude Maker","NuFX","n-Space","Obsidian Entertainment","Oddworld Inhabitants","Omega Force","Origin Systems","OtherSide Entertainment","Outfit7","Outrage Entertainment","Out of the Park Developments","Overkill Software","Oxygen Studios","Page 44 Studios","Pangea Software","Paradigm Entertainment","People Can Fly","Project Sora","Purple Lamp Studios","Papaya Studio","Project Soul","Panther Games Pty Ltd","Paradox Development Studio","Parallax Software","Pandemic Studios","Pendulo Studios","Penguin Software","Perfect World","Petroglyph","Phantagram","Pipeworks Studios","Piranha Bytes","Piranha Games","Pi Studios","Pivotal Games","Pixel Federation","Playdom","Playfish","PlayFirst","Playground Games","PlatinumGames","Polyphony Digital","PopCap Games","PopTop Software","Press Play","Psyonix","Punch Entertainment","Pyro Mobile","Q Entertainment","Q-Games","Quantic Dream","Quest Corporation","Radical Entertainment","Rage Games","Rainbow Studios","Rare","Raven Software","Ready at Dawn","Red Entertainment","Reality Pump Studios","Realtime Associates","Realtime Worlds","Rebellion Developments","Rebellion Warwick","RedLynx","Red Thread Games","Red Storm Entertainment","RedTribe (Tribalant)","Reflexive Entertainment","Relic Entertainment","Remedy Entertainment","Respawn Entertainment","Reto-Moto","Retro Studios","Revolution Software","Riot Games","Rising Star Games","Robot Entertainment","Rockstar Games\nRockstar India\nRockstar Leeds\nRockstar Lincoln\nRockstar London\nRockstar New England\nRockstar North\nRockstar San Diego\nRockstar Toronto","Rockstar Dundee","Rocksteady Studios","Robinson Technologies","Rovio Entertainment","Runic Games","Running with Scissors","Saber Interactive","Sand Grain Studios","Sandlot","Sanzaru Games","Sir-Tech","Schell Games","SCS Software","Sega","SEGA AM R&D Division 1 (Sega AM1)","SEGA AM R&D Division 2 (Sega AM2)","Sega AM3","Sega CS Research and Development No. 2 (Sonic Team)","Sega Sports R&D","Sensible Software","Shift","Bend Studio","San Mateo Studio (formerly Foster City Studio)","Japan Studio","London Studio","San Diego Studio","Santa Monica Studio","Studio Liverpool","SIE Worldwide Studios","SingleTrac","Shengqu Games","Sherman3D","Shin'en Multimedia","Sierra Entertainment","Silicon Knights","Silicon Studio","Simtex","skip Ltd.","Slant Six Games","Sledgehammer Games","Snail","Snapshot Games","Slightly Mad Studios","Slipgate Ironworks","Slitherine Software","Smilegate","SNK","Sobee Studios","Snowblind Studios","Software 2000","Sony Interactive Entertainment"
        ,"Sora Ltd.","Spellbound Entertainment","Spiders","Spike","Spike Chunsoft","Spil Games","Splash Damage","Sports Interactive","Sproing Interactive Media","Square Enix","Squad", "Stainless Games","Stainless Steel Studios","Starbreeze Studios","Stardock","Sting Entertainment","Strategic Simulations","Stoic Studio","Strawdog Studios","Straylight Studios","Streamline Studios","Success","Sucker Punch Productions",        "Sumo Digital","Supercell","Supermassive Games","SuperVillain Studios","Survios","Studio Wildcard","Swingin' Ape Studios","StormRegion","Sunstorm Interactive","Syn Sophia","SystemSoft Beta","Taito","Tango Gameworks","Tag Games",        "TaleWorlds Entertainment","Tamsoft","T&E Soft","Tantrumedia","Tantalus Media","Tarsier Studios","Tate Multimedia","Team17","Team Bondi","Team Ico","Team Ninja","Techland","Tecmo","Telltale Games","Tencent","Tencent Games","Tequila Works",        "Terminal Reality","Tetris Online","Teyon","Thatgamecompany","The Chinese Room","The Coalition","The Farm 51","The Initiative","THQ","THQ Nordic","Three Fields Entertainment","Three Rings Design","TimeGate Studios","TiMi Studios","Toaplan","ToeJam & Earl Productions","Tokyo RPG Factory","TopWare Interactive","Torpex Games","Torus Games","Tose","Toys for Bob","Trapdoor","Transmission Games","Traveller's Tales","Treyarch","Treasure","tri-Ace","tri-Crescendo","Trion Worlds","Tripwire Interactive","Triumph Studios","Turn 10 Studios","Turtle Rock Studios","Two Point Studios","Two Tribes","Typhoon Games (HK)","Ubisoft","Ubisoft Blue Byte","Ubisoft Reflections","UEP Systems","Ultimate Play the Game","Undead Labs","United Front Games","United Game Artists","Universomo","Valhalla Game Studios","Valve","Vanillaware","Vanpool","Venan Entertainment","Vicarious Visions","Vigil Games","Virtual Heroes","Virtuos","Visceral Games","Visual Concepts","Vostok Games","VoxelStorm","Wahoo Studios","Warhorse Studios","Wargaming","Wargaming Saint Petersburg","Wargaming Seattle","Warner Bros. Interactive Entertainment","WB Games Boston (formerly Turbine)","WB Games - Avalanche (formerly Avalanche Software)","Webfoot Technologies","WeMade","Westone Bit Entertainment","Westwood Studios","Wideload Games","Wildfire Studios","Wizet studio (Nexon development 1st division)","Wolfire Games","World Forge","Xbox Game Studios","XPEC Entertainment","Yager Development","Yuke's","ZeniMax Online Studios","Zen Studios","Zipper Interactive","Zombie Studios","ZootFly","Zynga", "Forty Flying Fish", "VLT Media", "VLT Media LLC"];
        this.ProductionAsset = ["Envato", "Turbo", "PS", "Nintendo", "Sony", "Nintendo Switch", "Valve", "CG Cookie", "DTS", "Gumroad", "DAZ", "Google" , "Ableton AG", "VB-Audio Software"];
        this.ProductionSubscription = ["Otoy", "Unity", "Epic", "Nintendo", "Sony", "Nintendo Switch", "Resilio", "Derivative", "Simplify", "Adobe", "Rebrandly", "WakaTime", "Paddle.com" ,"GitHub", "A2 Hosting", "Pluralsight"];
        this.StreamingSubscription = ["Netflix", "Amazon Prime Video", "Tencent Video", "iQIYI", "Disney+", "Youku", "HBO Max", "Peacock", "Hulu", "YouTube Premium", "iflix", "Discovery+", "ESPN+", "iWantTFC", "CuriosityStream", "Apple TV+", "Paramount+", "Rakuten TV", "Globoplay", "Crunchyroll", "Crave", "Zee5", "NOW", "Stan.", "Starz Play", "BritBox", "SonyLIV", "Neon", "BET+", "HayU", "Acorn TV", "Shudder", "Videoland", "Showmax", "Kayo Sports", "Binge", "FuboTV", "Atresplayer Premium", "AMC+", "IFC Films Unlimited", "Sundance Now", "Allblk", "We TV+", "Dasan networks", "BBC", "Comcast", "LYF", "Argela", "Sky", "Eros", "ITV", "Australian Broadcasting Corporation", "NRK", "Channel 4", "The Walt Disney Company", "RTÉ", "TG4", "TV3", "Global", "SBNTV1", "The Sumlin", "OSN", "Rotana Group", "SNA Corp", "PTCL", "Sports Fans Consortium"];
        this.ConvenienceStore = ["7-Eleven", "FamilyMart", "Lawson (store)", "Circle K", "Ministop", "ParknShop", "Big Bazaar", "Spencer's Retail", "Hypercity", "Reliance Fresh", "Spar (retailer)", "More (store)", "DMart", "Alfamart", "Bright Store (page does not exist)", "Ceriamart (page does not exist)", "Indomaret", "Daily Yamazaki", "Poplar (convenience store)", "Seicomart (page does not exist)", "Mynews.com", "Kedai Rakyat 1Malaysia", "Mydin", "CU (store)", "Carrefour", "Tesco", "GS25", "Hi-Life (retailer) (page does not exist)", "zh", "OK Mart (page does not exist)", "Tesco Lotus", "Fresh Mart", "Big C", "108 Shop", "Jiffy (convenience store)", "Ampm", "Alepa", "S Group", "K-citymarket", "8 \u00c3\u00a0 Huit", "CBA (food retail)", "Centra", "Republic of Ireland", "Northern Ireland", "Albert Heijn", "DekaMarkt", "SPAR", "Servex", "Railway stations in the Netherlands", "Deli de Luca", "Norway", "Narvesen", "Latvia", "Lithuania", "Reitan Group", "R-kioski", "Finland", "Estonia", "Pressbyr\u00c3\u00a5n", "Sweden", "Freshmarket", "Groszek", "Ma\u00c5\u201apka Express", "Polomarket", "Spo\u00c5\u201aem", "\u00c5\u00bbabka (Convenience store)", "Czech Republic", "Dia (supermarket chain)", "El Corte Ingl\u00c3\u00a9s", "Coop (Switzerland)", "Denner (supermarkets)", "Best-One", "Bestway", "Budgens", "Co-op Food", "Costcutter", "David Sands", "Happy Shopper", "Kwik Save", "L&F Jones", "Little Waitrose", "Londis (United Kingdom)", "M Local", "Mace (shop)", "Martin McColl", "Scotmid", "Scotland", "Nisa (retailer)", "One Stop (Tesco)", "Tesco plc", "Premier Stores", "Sainsbury's Local", "Bells Stores", "Sainsbury's", "Tesco Express", "Becker's", "Alimentation Couche-Tard", "Irving Oil", "Needs Convenience", "OLCO Petroleum Group", "On the Run (convenience store)", "Exxon", "Mobil", "Esso", "Pioneer Energy", "Farmacias Guadalajara", "OXXO", "Super City (store)", "North Little Rock, Arkansas", "Shell Oil Company", "Valero Energy Corporation", "Phillips 66", "West Memphis, Arkansas", "Harrisburg, Arkansas", "El Dorado, Arkansas", "La Palma, California", "ARCO", "Chevron Corporation", "San Ramon, California", "Roseville, California", "Loaf 'N Jug", "Pueblo, Colorado", "Kroger", "Gate Petroleum (page does not exist)", "RaceTrac", "Atlanta", "Stuckey's", "ABC Stores (Hawaii)", "Honolulu", "Aloha Petroleum", "Par Pacific Holdings", "Albertsons, Inc.", "Boise, Idaho", "Fast Eddy's", "Meridian, Idaho", "Roady's Truck Stops", "New Plymouth, Idaho", "Gardner, Illinois", "Huck's Food & Fuel", "Carmi, Illinois", "Jewel (supermarket)", "Itasca, Illinois", "Road Ranger", "Rockford, Illinois", "MotoMart (page does not exist)", "Martin's Super Markets", "South Bend, Indiana", "Casey's General Stores", "Ankeny, Iowa", "Kum & Go", "Kwik Shop", "Hutchinson, Kansas", "Minit Mart Foods Inc.", "Bowling Green, Kentucky", "Thorntons Inc.", "Louisville, Kentucky", "La Plata, Maryland", "High's Dairy Store", "Hanover, Maryland", "Royal Farms", "Baltimore", "Waltham, Massachusetts", "Cumberland Farms", "Framingham, Massachusetts", "Tedeschi Food Shops", "Bear Lake, MI", "Meijer", "Grand Rapids", "CHS Inc.", "Inver Grove Heights, Minnesota", "Holiday Stationstores", "Bloomington, Minnesota", "SuperAmerica", "Jr. Food Mart", "MFA Oil", "Town Pump", "Terrible Herbst", "QuickChek", "Allsup's", "Byrne Dairy", "Syracuse, New York", "Dairy Barn", "East Northport, New York", "NOCO Energy Corporation", "Tonawanda (town), New York", "Stewart's Shops", "The Pantry", "Cary, North Carolina", "Petro Express", "VPS Convenience", "Convenient Food Mart", "Mentor, Ohio", "Toledo, Ohio", "Speedway LLC", "Enon, Ohio", "Marathon Petroleum", "Hess Corporation", "TravelCenters of America", "Westlake, Ohio", "Brecksville, Ohio", "United Dairy Farmers", "Love's Travel Stops & Country Stores", "Oklahoma City", "Stillwater, Oklahoma", "QuikTrip", "Dari Mart", "Junction City, Oregon", "Plaid Pantry", "Twin Tiers", "A-Plus", "Philadelphia", "Sunoco", "Acme Markets", "Malvern, Pennsylvania", "GetGo", "Pittsburgh, Pennsylvania", "Giant Eagle", "United Refining Company", "Warren, Pennsylvania", "Lewistown, Pennsylvania", "Rutter's", "York, Pennsylvania", "Sheetz", "Altoona, Pennsylvania", "Tom's Convenience Store", "Turkey Hill Minit Markets", "Lancaster, Pennsylvania", "Wawa Inc.", "Empresas Copec", "Brentwood, Tennessee", "Pilot Flying J", "Knoxville, Tennessee", "Pilot Corp.", "Weigel's", "Dallas", "Army and Air Force Exchange Service", "Buc-ee's", "Lake Jackson, Texas", "Corner Store", "San Antonio", "Irving, Texas", "Texarkana, Texas", "Stripes Convenience Stores", "Corpus Christi, Texas", "Perkinsville, Vermont", "Saint Albans, Vermont", "Mount Holly, Virginia", "GPM Investments", "Richmond, Virginia", "Farm Fresh Food & Pharmacy", "Virginia Beach, Virginia", "Go-Mart", "West Virginia", "Virginia", "Kentucky", "Kwik Trip", "La Crosse, Wisconsin", "PDQ Food Stores", "Coles Express", "NewsLink", "NightOwl Convenience Stores", "Ampol", "IGA (supermarkets)", "Daily Stop", "Jacksons Stores", "Local Plus", "Mac's Convenience Stores", "Mills Group Ltd", "Shreveport, Louisiana", "Somerfield", "Town & Country Food Stores", "Ugo (store)", "Poundstretcher", "Uni-Mart", "UtoteM", "Convenience shop", "Akwa Group", "Sasol", "759 Store", "Emart", "Relay (shop)", "Storyway", "China Resources Vanguard", "All Day Convenience Store", "Pertamina", "Singapore Petroleum Company", "Co.op Food (page does not exist)", "NTUC FairPrice", "Petronas", "Royal Dutch Shell", "Caltex", "Tops Supermarket", "Buy the Way", "BP Connect", "Circle K Sunkus", "Bargain Booze", "Londis (Ireland)", "McColl's", "Waitrose", "Opencor", "Billa (supermarket)", "Carrefour Express", "Dixy", "Eurocash", "Magnit", "Piotr i Pawe\u00c5\u201a", "Pyaterochka", "Ahold Delhaize", "Valora (company)", "Carrefour City", "Franprix", "March\u00c3\u00a9 Plus", "Migros", "Monoprix", "Groupe Casino", "Morrisons M Local", "Provi-Soir", "Quickie Convenience Stores", "Soriana", "ABC Stores (convenience store)", "Amazon Go", "Tesoro Corporation", "Giant Industries", "USA Gasoline", "EG Group", "Quik Stop", "Smith's Food and Drug", "Tom Thumb Food Stores", "Global Partners", "Village Pantry", "Jr. Food Stores", "Murphy USA", "Clark Brands", "Quality Dairy Company", "Wawa (company)", "CST Brands", "Getty Oil", "White Hen Pantry", "Gull Petroleum", "Cymbal manufacturers"];
        this.SuperStore = ["Auchan", "Babies \"R\" Us", "Barnes & Noble", "Best Buy", "Blockbuster Video", "Borders Group", "Bricorama", "Cabela's", "Carrefour", "Castorama", "Conforama", "Cora (hypermarket)", "Costco", "Darty", "Decathlon", "E.Leclerc", "Fnac", "Galeries Lafayette", "Geoffrey's Toy Box", "Toys R Us", "Hipercor", "The Home Depot", "IKEA", "Kaufland", "Kmall24", "Kmart", "Sears Holdings Corporation", "Sears", "Leroy Merlin", "Norauto", "OBI (store)", "Office 1", "Office Depot", "PetSmart", "PriceSmart", "Real (hypermarket)", "Metro AG", "Sephora", "Staples Inc.", "Target Corporation", "Tesco", "Tower Records", "Toys \"R\" Us", "Walmart", "Sam's Club", "Big W", "Bing Lee", "Bunnings Warehouse", "Harvey Norman", "JB Hi-Fi", "Kmart Australia", "Mitre 10", "Officeworks", "Supercheap Auto", "Target (Australia)", "The Good Guys (Australian company)", "Agora Super Stores", "The Brick", "Canadian Tire", "Chapters (bookstore)", "Dollarama", "Food Basics", "Giant Tiger", "Home Outfitters", "HomeSense", "The Hudson's Bay Company", "Indigo Books and Music", "Jean Coutu Group", "Jysk (store)", "Lawtons Drugs", "La-Z-Boy", "Loblaws", "Loblaw Companies", "Real Canadian Superstore", "Shoppers Drug Mart", "London Drugs", "Mastermind Toys", "Metro Inc.", "Penningtons", "Rona (company)", "Sears Canada", "Sobeys", "Sport Chek", "Staples (Canada)", "Target Canada", "China Resources", "PARKnSHOP", "3 Suisses", "Brico Depot", "Bricomarch\u00c3\u00a9", "Intermarch\u00c3\u00a9", "Celio (retailer)", "Decathlon (retailer)", "G\u00c3\u00a9ant Casino", "Groupe Casino", "Habitat (retailer)", "Hygena", "Hyper U", "Intersport", "Jean Delatour", "Monoprix", "Mr Bricolage", "MS Mode", "Groupe Saint-Gobain", "Printemps", "La Redoute", "Saint Maclou", "Soho", "Big Bazaar", "Reliance Industries", "Easyday", "Giant Hypermarket", "Ikea", "More (store)", "Amazon (company)", "Namdhari's Fresh", "Reliance Retail", "Saravana Stores", "Spencer's Retail", "\u00c3\u2020ON", "Hero Supermarket", "LuLu Hypermarket", "CT Corp", "Matahari Hypermart", "BigC", "Makro", "Coop Obs!", "Mitre 10 (New Zealand)", "Pak'nSave", "Imtiaz Super Market", "City Supermarket, Inc.", "SM Hypermarket", "Landers (store) (page does not exist)", "S&R (store) (page does not exist)", "Robinsons Supermarket", "Big C", "Central Retail Corporation", "Tesco Lotus", "Argos (retailer)", "Asda", "B&Q", "Currys", "Dfs (retailer)", "Halfords", "Matalan", "Morrisons", "Sainsbury's", "Marks & Spencer", "A.C. Moore", "Ace Hardware", "Albertsons", "Aldi", "Ames (department store)", "Ashley Furniture", "At Home (store)", "AutoZone", "Bass Pro Shops", "Bed Bath & Beyond", "Big Lots", "Books-A-Million", "Burlington (department store)", "Buy Buy Baby", "CarMax", "Child World", "Circuit City", "CompUSA", "The Container Store", "Cost Plus, Inc.", "Crate & Barrel", "Curacao (department store)", "CVS Pharmacy", "DSW, Inc.", "Dick's Sporting Goods", "Dollar General", "Dollar Tree", "Ascena Retail Group", "Eckerd Corporation", "Famous Footwear", "Five Below", "Fry's Electronics", "F.y.e.", "Gander Mountain", "Goodwill Industries", "Guitar Center", "Half Price Books", "Hastings Entertainment", "Hhgregg", "Hobby Lobby", "HomeGoods", "J. C. Penney", "Jo-Ann Stores", "Transformco", "Kohl's", "Kroger", "Food 4 Less & Foods Co.", "Fred Meyer", "Lechmere", "Linens n' Things", "Lowe's", "Macy's", "Marshalls", "Meijer", "Menards", "Michaels", "OfficeMax", "Old Navy", "Old Time Pottery", "Ollie's Bargain Outlet", "Remaindered books", "Party City", "Payless Shoe Source", "Petco", "Pier 1 Imports", "Publix", "Rite Aid", "Ross Dress for Less", "Safeway Inc.", "The Salvation Army", "Shopko", "ShopRite (United States)", "Spirit Halloween", "Sports Authority", "Stein Mart", "Crown Books", "SuperValu (United States)", "New Albertsons", "Save-A-Lot", "Thrift Drug", "TJ Maxx", "Kids \"R\" Us", "Trader Joe's", "Ulta Beauty", "Walgreens", "Walmart Neighborhood Market", "Whole Foods Market", "BJ's Wholesale Club", "Cymbal manufacturers"];
        this.PCHardDrive = ["SSD", "HDD", "3.5", "2.5", "SDSSA"];
        this.CurrentOrder = {};
        this.SetTaxButlerCache();
        // var taxbultercache = localStorage.getItem(this.LocalStorageCacheKey);

        // if(taxbultercache == null){
        //     console.log("Taxbutler not filled");
        // this.OutUserDicts = {"Orders" :[]};

        // }
        // else{
        // this.OutUserDicts = taxbultercache;

        //     console.log("Taxbutler filled");
        // }

        this.CheckBoxForName = this.CheckBoxForName.bind(this);
        this.GetOrderType = this.GetOrderType.bind(this);
        this.CalculateOverallPayments = this.CalculateOverallPayments.bind(this);
        this.downloadCurrentJson = this.downloadCurrentJson.bind(this);
        this.CheckForCurrentOrderId = this.CheckForCurrentOrderId.bind(this);
    }
    
    
    
    SetTaxButlerCache(){
        // var taxbultercache = localStorage.getItem(this.LocalStorageCacheKey);
        // var taxbultercache = localStorage.getItem(this.LocalStorageCacheKey);

        // if(taxbultercache == null){

        if(previousdata == undefined | previousdata == null | previousdata == false | loadedData == "{}" | loadedData == {} ){
            console.log("Taxbutler not filled");
        this.OutUserDicts = {"Orders" :[]};
        this.Preloaded = false;

        }
        else{
            try{
            if(loadedData.taxbutleramazon.Orders != undefined){
            // var obj = JSON.parse(taxbultercache);
            var obj = loadedData.taxbutleramazon;
            console.log(loadedData);
            console.log(obj);
            // this.OutUserDicts = {"Orders" :[]};
        this.OutUserDicts = obj;
        this.Preloaded = true;
            console.log("Taxbutler filled");
            }else{
                console.log("Taxbutler not filled");
                this.OutUserDicts = {"Orders" :[]};
                this.Preloaded = false;

            }
        }catch (err){

            console.log(err);
            console.log("Taxbutler not filled");
            this.OutUserDicts = {"Orders" :[]};
            this.Preloaded = false;
    
        }
        }
    }
    SaveTaxButlerCache(){
        localStorage.setItem(this.LocalStorageCacheKey, JSON.stringify(this.OutUserDicts, null, 2));

    }

    downloadJson(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    downloadCurrentJson(fileName, contentType) {
    this.CalculateOverallPayments();
        
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(this.OutUserDicts, null, 2)], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    GetOrderType(title){
        var typee = "Undefined";
        this.PCPart.forEach(word => {
            if(title.includes(word)){
                typee = "PCPart";
            }
        });
        this.HomeOffice.forEach(word => {
            if(title.includes(word)){
                typee = "HomeOffice";
            }
        });
        this.PCHardDrive.forEach(word => {
            if(title.includes(word)){
                typee = "PCHardDrive";
            }
        });
        this.LivingExpenses.forEach(word => {
            if(title.includes(word)){
                typee = "LivingExpenses";
            }
        });
        this.VideoGames.forEach(word => {
            if(title.includes(word)){
                typee = "VideoGames";
            }
        });
        this.ProductionAsset.forEach(word => {
            if(title.includes(word)){
                typee = "ProductionAsset";
            }
        });
        this.ProductionSubscription.forEach(word => {
            if(title.includes(word)){
                typee = "ProductionSubscription";
            }
        });
        
        this.StreamingSubscription.forEach(word => {
            if(title.includes(word)){
                typee = "StreamingSubscription";
            }
        });
        this.ConvenienceStore.forEach(word => {
            if(title.includes(word)){
                typee = "ConvenienceStore";
            }
        });
        this.SuperStore.forEach(word => {
            if(title.includes(word)){
                typee = "SuperStore";
            }
        });
        return typee;
    }

    CalculateOverallPayments(){
        var NoneChoices = [];
        var NoneChoicesPrice = 0;
        var PCParts = [];
        var PCPartsPrice = 0;
        var HomeOfficePrice = 0;
        var PCHardDrivePrice = 0;
        var LivingExpensesPrice = 0;
        var VideoGamesPrice = 0;
        var HomeOffice = [];
        var PCHardDrive = [];
        var LivingExpenses = [];
        var VideoGames = [];
        this.OutUserDicts.Orders.forEach(orderr => {
            var Category = orderr.Category;
            var OrderPrice = parseFloat(orderr.Price.replace(/\$/g,''));
            console.log(Category);
            if(Category == "PCPart"){
                PCPartsPrice += OrderPrice;
                PCParts.push(orderr);
            }
            if(Category == "HomeOffice"){
                HomeOfficePrice += OrderPrice;
                HomeOffice.push(orderr);
            }
            if(Category == "LivingExpenses"){
                LivingExpensesPrice += OrderPrice;
                LivingExpenses.push(orderr);
            }
            if(Category == "VideoGames"){
                VideoGamesPrice += OrderPrice;
                VideoGames.push(orderr);
            }
            
            if(Category == "PCHardDrive"){
                PCHardDrivePrice += OrderPrice;
                PCHardDrive.push(orderr);
            }
            
            if(Category == "NoneChoices"){
                NoneChoicesPrice += OrderPrice;
                NoneChoices.push(orderr);
            }
            
            if(Category == "Undefined"){
                NoneChoicesPrice += OrderPrice;
                NoneChoices.push(orderr);
            }
            
            
        }
        
        );
        this.OutUserDicts.Summary = {Undefined : NoneChoices, UndefinedPrice : NoneChoicesPrice,
            PCParts : PCParts, PCPartsPrice : PCPartsPrice,
            HomeOffice : HomeOffice, HomeOfficePrice : HomeOfficePrice,
            PCHardDrive : PCHardDrive, PCHardDrivePrice : PCHardDrivePrice,
            LivingExpenses : LivingExpenses, LivingExpensesPrice : LivingExpensesPrice,
            VideoGames : VideoGames, VideoGamesPrice : VideoGamesPrice
        }

    }
    CheckForCurrentOrderId(orderId){

        // var orderId = "12lk3jlkjfhkl";
        for(var i = 0; i < this.OutUserDicts.Orders.length - 1; i ++){
            var order = this.OutUserDicts.Orders[i];

            if(order.Vendor == "Amazon" ){
        for(var v = 0; v < order.Items.length - 1; v ++){
            var itemm =  order.Items[v];
            if(itemm.OrderId == orderId){

                return true;
            }


        }
        return false;

    }


        }


    }
    CheckBoxForName( name){

        var orders = document.getElementsByClassName("order");
        for(var i = 0; i < orders.length - 1; i ++){
            var order = orders[i];
        // orders.forEach(order=>{
            var boxes = order.getElementsByClassName("a-col-left");

            for(var b = 0; b < boxes.length - 1; b ++){
                var box = boxes[b];
            // boxes.forEach(box=>{
    

        var v =box.querySelectorAll(".trigger-text");
        if (v[0] != undefined){
        var pricebox =box.querySelectorAll(".a-span2");
        var price =pricebox[0].querySelectorAll(".value");

        var textt = v[0].innerText;
        var pricetextt = price[0].innerText;
        var DateArea =order.querySelectorAll(".a-span3");
        var DateAreaText =DateArea[0].querySelectorAll(".value");

        var userdict = {"User":textt, "Price" : pricetextt, "Items": [], "Date": DateAreaText[0].innerText, "OrderId": order.getElementsByTagName("bdi")[0].innerText , "Category":"None", "Vendor": "Amazon"};
        // console.log(textt,name );
        var Links =order.querySelectorAll(".a-link-normal");
        if (this.Preloaded == true){


        // this.OutUserDicts.Orders.forEach(orderr => {
        //     if(orderr.OrderId == order.getElementsByTagName("bdi")[0].innerText ){
        //         console.log("Order Exists");
        //         this.SkipOrder = true;
        //     }

        // });

        if(this.CheckForCurrentOrderId(order.getElementsByTagName("bdi")[0].innerText)){

            console.log("Order Exists");
                // this.SkipOrder = true;
        }




    }

 
    if(this.SkipOrder == false){
        Links.forEach(Link=>{
    
    if(Link.innerText != "" && Link.innerText != "Archive order" && Link.innerText != "View invoice" && Link.innerText != "View order details"  && Link.innerText != "View order details " ){
        if( this.GetOrderType(Link.innerText) !="None"){
            // console.log("WOAH ITS NOT NONE ", this.GetOrderType(Link.innerText));
            userdict.Category = this.GetOrderType(Link.innerText);
        }
        var itemdict = {"Title" :Link.innerText, "Link" : Link.href, "Category": this.GetOrderType(Link.innerText)}
        
        userdict.Items.push(itemdict);

    
    }
    });
    if(name != ""){
        if (textt == name){

        this.chosenPieces.push(box);
        this.chosenPrices.push(price);
        this.OutUserDicts.Orders.push(userdict);

    }
    }else{

        this.chosenPieces.push(box);
        this.chosenPrices.push(price);
        this.OutUserDicts.Orders.push(userdict);


    }
        }

    }
        }
        // );

    }
    this.SaveTaxButlerCache();
    // this.downloadJson(JSON.stringify(this.OutUserDicts, null, 2), 'AmazonOrders.json', 'text/plain');

        console.log(this.OutUserDicts);
    return(this.OutUserDicts);
}
}
function done(data) {
    var msg = { command: 'processdone', result: 'Amazon-PageProcess', data: data};
    chrome.runtime.sendMessage(msg);
}

function Main(){
  

console.log(previousdata);
console.log(loadedData.taxbutleramazon);


try{
var AmazonOrdersCrawler_ = new AmazonOrdersCrawler();
// Grab Single Person's orders on a page
done(AmazonOrdersCrawler_.CheckBoxForName(usernamee));


}catch (err){
    console.log("Failed 1");
    console.log(err);
    done(AmazonOrdersCrawler_.CheckBoxForName(usernamee));


}


// Grab all orders on a page
// AmazonOrdersCrawler_.CheckBoxForName("");

// Download Amazon Json
// AmazonOrdersCrawler_.downloadCurrentJson( 'AmazonOrders.json', 'text/plain');
// }
}
// localStorage.getItem("taxbutler-name")
// console.log("dfsdffdfffffffffffff");
Main();