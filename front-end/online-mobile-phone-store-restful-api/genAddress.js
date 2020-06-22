// all data comes from randomlists (https://www.randomlists.com/)
var addresses =
    `767 Old Fawn St.
    Milton, MA 02186
    8232 Ohio St.
    Valdosta, GA 31601
    396 Honey Creek Avenue
    Logansport, IN 46947
    225 Bohemia St.
    Tampa, FL 33604
    534 Marsh Road
    Morgantown, WV 26508
    8853 Meadow Ave.
    Henrico, VA 23228
    434 River St.
    Aberdeen, SD 57401
    46 Lincoln St.
    Franklin, MA 02038
    9643 Carson Ave.
    Oak Park, MI 48237
    247 Bedford Street
    Stuart, FL 34997
    65 Wood Street
    North Bergen, NJ 07047
    948 Stillwater Street
    Hermitage, TN 37076
    59 Pumpkin Hill Street
    Attleboro, MA 02703
    7659 El Dorado Drive
    Lithonia, GA 30038
    34 Valley Farms Street
    Calumet City, IL 60409
    94 Cobblestone Ave.
    Galloway, OH 43119
    187 Race Road
    Romeoville, IL 60446
    652 Bayberry Drive
    Stevens Point, WI 54481
    4 Cardinal Drive
    Randolph, MA 02368
    7912 Ivy Ave.
    Saratoga Springs, NY 12866
    9099 Rockwell St.
    North Royalton, OH 44133
    8813 Wellington Road
    Rockville Centre, NY 11570
    39 West Lakewood Street
    Macon, GA 31204
    58 3rd St.
    Carrollton, GA 30117
    168 Lincoln Street
    Middle Village, NY 11379
    7780 Old York Dr.
    Smyrna, GA 30080
    866 East High Street
    Hamburg, NY 14075
    524 Walt Whitman Ave.
    Bensalem, PA 19020
    823 E. Mountainview St.
    Clover, SC 29710
    831 Broad Drive
    Muskego, WI 53150
    9835 Pine Road
    Tullahoma, TN 37388
    194 Winchester Drive
    Bel Air, MD 21014
    7820 Manchester Avenue
    San Pablo, CA 94806
    8435 Pumpkin Hill Ave.
    West Roxbury, MA 02132
    44 Hudson Lane
    Racine, WI 53402
    9 Mill St.
    Enfield, CT 06082
    7787 Roberts St.
    Hartsville, SC 29550
    593 Arch Ave.
    Lake Worth, FL 33460
    1 Del Monte Ave.
    Menasha, WI 54952
    17 East St Louis Ave.
    Wilson, NC 27893
    2 Proctor Lane
    Selden, NY 11784
    7 Thatcher Dr.
    North Fort Myers, FL 33917
    952 Big Rock Cove St.
    Cary, NC 27511
    532 Hickory Lane
    Bedford, OH 44146
    896 Griffin Street
    Franklin Square, NY 11010
    8329 Myrtle Street
    Solon, OH 44139
    31 West Windsor Drive
    Davenport, IA 52804
    7347 Mayfield Dr.
    Warminster, PA 18974
    755 Euclid Ave.
    Shakopee, MN 55379
    184 Academy Lane
    Elizabeth City, NC 27909
    8535 W. Rose Street
    Stratford, CT 06614
    18 Logan St.
    Plymouth, MA 02360
    88 West Third St.
    Westford, MA 01886
    8249 Littleton St.
    Daphne, AL 36526
    9839 East Longbranch Avenue
    Louisville, KY 40207
    8134 Belmont St.
    Stamford, CT 06902
    568 Corona Drive
    Gibsonia, PA 15044
    9168 Laurel Lane
    Fuquay Varina, NC 27526
    8796 Strawberry Ave.
    Seattle, WA 98144
    67 Carriage St.
    Royersford, PA 19468
    7563 Hill Ave.
    Butler, PA 16001
    23 Ketch Harbour Avenue
    Casselberry, FL 32707
    66 Rockcrest Lane
    Billings, MT 59101
    979 W. Second St.
    Seymour, IN 47274
    8955 Sunbeam Avenue
    Snellville, GA 30039
    66 Plumb Branch Street
    Cedar Rapids, IA 52402
    7518 Van Dyke St.
    Spring Valley, NY 10977
    9778 Manor St.
    Pasadena, MD 21122
    80 Schoolhouse Street
    Hackensack, NJ 07601
    60 Newcastle St.
    Superior, WI 54880
    8551 Ohio St.
    Ypsilanti, MI 48197
    543 Henry Street
    Peachtree City, GA 30269
    185 River Street
    Union City, NJ 07087
    845 Silver Spear Ave.
    Point Pleasant Beach, NJ 08742
    89 Cooper Drive
    Tallahassee, FL 32303
    61 Amherst Street
    Dover, NH 03820
    893 Parker Street
    Pittsburgh, PA 15206
    7831 John Ave.
    Dayton, OH 45420
    8482 Roberts St.
    Windermere, FL 34786
    59 Jennings Ave.
    Anoka, MN 55303
    9842 Pacific St.
    Palm Harbor, FL 34683
    465 Cobblestone St.
    Aiken, SC 29803
    9822 Thorne Street
    West Bend, WI 53095
    565 W. Shirley Street
    Ridgecrest, CA 93555
    39 Branch Road
    Riverview, FL 33569
    40 Rocky River Ave.
    South El Monte, CA 91733
    6 Pennsylvania Road
    New Britain, CT 06051
    85 N. Circle Drive
    Apple Valley, CA 92307
    29 Cypress St.
    Ames, IA 50010
    656 Hilldale St.
    Randallstown, MD 21133
    166 East Cooper Road
    West Bloomfield, MI 48322
    38 Fairground Ave.
    Menomonee Falls, WI 53051
    9420B Cooper Street
    Clermont, FL 34711
    8454 Henry Smith St.
    Clarksburg, WV 26301
    7730 W. Eagle Road
    San Carlos, CA 94070
    863 East Vale Court
    Newnan, GA 30263
    8638 East Philmont St.
    Merrick, NY 11566
    50 Evergreen Avenue
    Conyers, GA 30012
    889 Hill Dr.
    Kennesaw, GA 30144
    3 Mayflower St.
    Ashland, OH 44805`.split(/\n/);


// set up protytype for random selection from array
Array.prototype.address = function () {
    var num = Math.floor(Math.random() * (this.length - 2))
    if (num % 2 == 1)
        num -= 1;
    return {
        line1: this[num].trim(),
        line2: this[num + 2].trim(),
        town: this[num + 3].split(',')[0].trim(),
        city: this[num + 1].split(',')[0].trim(),
        eircode: this[num + 1].split(',')[1] === undefined ? '' : this[num + 1].split(',')[1].trim()
    };
}

function getRandomAddress() {
    return addresses.address();
}
//console.log(getRandomAddress())

module.exports = getRandomAddress;
