// all data comes from randomlists (https://www.randomlists.com/)
var phoneNumbers =
    `(846) 457-6040
    (483) 845-6483
    (558) 489-6943
    (601) 550-0964
    (489) 203-7697
    (453) 798-8506
    (552) 342-2306
    (967) 394-5219
    (615) 856-9218
    (643) 431-0461
    (495) 918-6228
    (875) 214-4431
    (874) 369-7933
    (828) 666-8632
    (743) 510-8138
    (921) 559-5521
    (324) 411-0548
    (666) 944-5901
    (325) 332-8933
    (820) 623-2020
    (787) 620-6685
    (921) 483-9696
    (726) 618-4823
    (645) 936-4408
    (208) 697-4474
    (448) 451-5361
    (681) 666-6363
    (487) 512-2872
    (289) 660-1156
    (914) 751-8082
    (285) 938-2486
    (599) 892-8133
    (474) 527-2566
    (970) 737-4364
    (835) 570-2409
    (422) 842-2638
    (853) 940-8703
    (900) 689-9056
    (265) 221-4899
    (258) 958-8191
    (494) 873-8653
    (923) 262-5305
    (879) 786-2510
    (356) 934-1533
    (772) 936-5257
    (682) 419-6011
    (524) 985-5794
    (531) 458-7247
    (661) 748-0648
    (542) 351-1757
    (409) 829-6109
    (879) 299-0883
    (782) 262-4622
    (323) 257-9234
    (509) 222-9881
    (441) 352-9260
    (313) 469-5595
    (886) 787-9632
    (901) 876-1425
    (439) 332-4188
    (405) 354-7923
    (671) 391-8732
    (972) 275-7382
    (534) 718-6041
    (246) 570-1270
    (788) 720-0569
    (682) 550-2281
    (685) 264-8121
    (234) 559-4532
    (231) 288-6397
    (347) 248-5267
    (719) 533-6999
    (606) 422-0796
    (284) 284-7867
    (212) 652-0292
    (446) 741-8431
    (438) 893-2085
    (461) 228-7765
    (465) 536-8861
    (488) 508-4747
    (522) 542-0640
    (942) 759-1483
    (564) 637-3186
    (335) 938-0121
    (280) 823-3284
    (826) 918-9706
    (267) 648-7961
    (828) 894-6176
    (620) 482-6792
    (242) 935-5811
    (920) 886-7879
    (742) 493-6255
    (252) 301-6711
    (907) 483-6928
    (480) 728-4340
    (527) 455-5296
    (954) 934-0283
    (223) 667-1091
    (613) 760-5770
    (307) 955-0669`.split(/\n/);

var emails =
    `jsbach@att.net
    sisyphus@icloud.com
    arnold@icloud.com
    adhere@att.net
    jsnover@sbcglobal.net
    parasite@yahoo.ca
    noticias@comcast.net
    phizntrg@me.com
    isorashi@icloud.com
    karasik@outlook.com
    philb@sbcglobal.net
    pfitza@yahoo.com
    sscorpio@hotmail.com
    william@att.net
    jmorris@outlook.com
    seano@verizon.net
    hachi@att.net
    malvar@mac.com
    parksh@yahoo.com
    bruck@live.com
    jonas@yahoo.com
    parrt@hotmail.com
    shawnce@me.com
    kimvette@gmail.com
    lushe@mac.com
    lishoy@att.net
    delpino@yahoo.com
    dieman@me.com
    froodian@gmail.com
    timlinux@hotmail.com
    scitext@me.com
    dleconte@me.com
    plover@optonline.net
    jfinke@att.net
    carreras@verizon.net
    squirrel@aol.com
    multiplx@comcast.net
    cumarana@hotmail.com
    timlinux@me.com
    skajan@yahoo.ca
    chrwin@yahoo.ca
    improv@aol.com
    daveewart@sbcglobal.net
    elflord@att.net
    hermanab@mac.com
    cvrcek@aol.com
    rhialto@comcast.net
    johnbob@optonline.net
    corrada@optonline.net
    seanq@att.net
    liedra@hotmail.com
    bmcmahon@yahoo.com
    sarahs@yahoo.ca
    muzzy@yahoo.ca
    peoplesr@yahoo.ca
    seanq@yahoo.com
    wenzlaff@live.com
    ahmad@msn.com
    tezbo@outlook.com
    hauma@hotmail.com
    fhirsch@sbcglobal.net
    jelmer@comcast.net
    techie@me.com
    geekoid@aol.com
    openldap@msn.com
    dartlife@optonline.net
    rfoley@hotmail.com
    adillon@me.com
    joglo@hotmail.com
    rupak@msn.com
    mschilli@yahoo.ca
    thrymm@icloud.com
    pthomsen@optonline.net
    dmath@hotmail.com
    oevans@verizon.net
    hahiss@verizon.net
    singh@mac.com
    stakasa@msn.com
    jfreedma@icloud.com
    sjmuir@optonline.net
    szymansk@mac.com
    multiplx@aol.com
    dburrows@comcast.net
    lbecchi@optonline.net
    ijackson@comcast.net
    ninenine@live.com
    formis@outlook.com
    damian@me.com
    chaffar@mac.com
    rddesign@yahoo.com
    rasca@verizon.net
    tubajon@icloud.com
    mwandel@yahoo.ca
    drolsky@hotmail.com
    natepuri@icloud.com
    mddallara@outlook.com
    khris@mac.com
    lamky@hotmail.com
    codex@live.com
    bulletin@yahoo.com`.split(/\n/);

var titles =
    `Mr
    Mrs
    Miss
    Ms
    Mx
    Sir
    Dr
    Lady
    Lord`.split(/\n/);

function getRandomOther() {
    return {
        mobile : phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)].trim(),
        email: emails[Math.floor(Math.random() * emails.length)].trim(),
        title: titles[Math.floor(Math.random() * titles.length)].trim(),
    };
}
//console.log(getRandomOther())

module.exports = getRandomOther;
