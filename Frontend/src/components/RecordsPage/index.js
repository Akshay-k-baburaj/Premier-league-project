import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Trophy, Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import "./index.scss";
const RecordsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const recordDetails = {
    "Most Premier League Titles": {
      title: "Most Premier League Titles",
      topFive: [
        { team: "Manchester United", value: "13 titles", years: "1992-93 to 2012-13" },
        { team: "Manchester City", value: "7 titles", years: "2011-12 to 2022-23" },
        { team: "Chelsea", value: "5 titles", years: "2004-05 to 2016-17" },
        { team: "Arsenal", value: "3 titles", years: "1997-98 to 2003-04" },
        { team: "Liverpool", value: "1 title", years: "2019-20" }
      ],
      additionalInfo: "Manchester United dominated the Premier League era under Sir Alex Ferguson, winning their first Premier League title in 1993 and their last in 2013."
    },
    "Most Points in a Season": {
      title: "Most Points in a Season",
      topFive: [
        { team: "Manchester City", value: "100 points", years: "2017-18" },
        { team: "Liverpool", value: "99 points", years: "2019-20" },
        { team: "Manchester City", value: "98 points", years: "2018-19" },
        { team: "Liverpool", value: "97 points", years: "2018-19" },
        { team: "Manchester City", value: "96 points", years: "2021-22" }
      ],
      additionalInfo: "Manchester City's centurions season in 2017-18 set a new standard for Premier League excellence under Pep Guardiola."
    },
    "Most Points Without Winning Title": {
      title: "Most Points Without Winning Title",
      topFive: [
        { "team": "Liverpool", "value": "97 points", "years": "2018/19" },
        { "team": "Liverpool", "value": "92 points", "years": "2021/22" },
        { "team": "Arsenal", "value": "89 points", "years": "2023/24" },
        { "team": "Manchester United", "value": "89 points", "years": "2011/12" },
        { "team": "Manchester United", "value": "88 points", "years": "1994/95" }
          ],
      additionalInfo:"Liverpool (2018/19): Accumulated 97 points but finished second to Manchester City, who had 98 points."
    },

    "Fewest Points in a Season": {
      "title": "Fewest Points in a Season",
      "topFive": [
        { "team": "Derby County", "value": "11 points", "years": "2007/08" },
        { "team": "Sunderland", "value": "15 points", "years": "2005/06" },
        { "team": "Huddersfield Town", "value": "16 points", "years": "2018/19" },
        { "team": "Aston Villa", "value": "17 points", "years": "2015/16" },
        { "team": "Sunderland", "value": "19 points", "years": "2002/03" }
      ],
      "additionalInfo":"Derby County's 2007/08 campaign is the worst in Premier League history, as they managed only 11 points, winning just one game all season."
    },

    "Most Home Points in a Season": {
      "title": "Most Home Points in a Season",
      "topFive": [
        { "team": "Chelsea", "value": "55 points", "years": "2005/06" },
        { "team": "Manchester United", "value": "55 points", "years": "2010/11" },
        { "team": "Manchester City", "value": "55 points", "years": "2011/12" },
        { "team": "Liverpool", "value": "55 points", "years": "2019/20" },
        { "team": "Manchester City", "value": "54 points", "years": "2017/18" }
      ],
      "additionalInfo":"Chelsea's 2005/06 season saw them earn a record 55 home points out of a possible 57, winning 18 and drawing just one of their home games."
    },

    "Most Away Points in a Season": {
      "title": "Most Away Points in a Season",
      "topFive": [
        { "team": "Manchester City", "value": "50 points", "years": "2017/18" },
        { "team": "Manchester City", "value": "45 points", "years": "2020/21" },
        { "team": "Arsenal", "value": "47 points", "years": "2001/02" },
        { "team": "Chelsea", "value": "48 points", "years": "2004/05" },
        { "team": "Liverpool", "value": "44 points", "years": "2018/19" }
      ],
      "additionalInfo":"Manchester City's 2017/18 title-winning team set a new standard by securing 50 away points, the most by any team in a Premier League season."
    },

      "Most Goals in a Season": {
      "title": "Most Goals in a Season",
          "topFive": [
            { "team": "Manchester City", "value": "106 goals", "years": "2017/18" },
            { "team": "Chelsea", "value": "103 goals", "years": "2009/10" },
            { "team": "Manchester City", "value": "102 goals", "years": "2019/20" },
            { "team": "Liverpool", "value": "101 goals", "years": "2013/14" },
            { "team": "Manchester City", "value": "99 goals", "years": "2013/14" }
          ],
          "additionalInfo": "Manchester City's 2017/18 season saw them become the first team to score over 100 goals in a Premier League season, breaking the previous record."
        },

"Fewest Goals in a Season": {
  "title": "Fewest Goals in a Season",
  "topFive": [
    { "team": "Derby County", "value": "20 goals", "years": "2007/08" },
    { "team": "Sunderland", "value": "21 goals", "years": "2002/03" },
    { "team": "Huddersfield Town", "value": "22 goals", "years": "2018/19" },
    { "team": "Aston Villa", "value": "27 goals", "years": "2014/15" },
    { "team": "Norwich City", "value": "26 goals", "years": "2019/20" }
  ],
  "additionalInfo": "Derby County holds the unfortunate record for the fewest goals scored in a single Premier League season with just 20 goals in 2007/08."
},

"Most Goals Conceded": {
  "title": "Most Goals Conceded",
  "topFive": [
    { "team": "Swindon Town", "value": "100 goals", "years": "1993/94" },
    { "team": "Derby County", "value": "89 goals", "years": "2007/08" },
    { "team": "Ipswich Town", "value": "93 goals", "years": "1994/95" },
    { "team": "Barnsley", "value": "82 goals", "years": "1997/98" },
    { "team": "Norwich City", "value": "84 goals", "years": "2021/22" }
  ],
  "additionalInfo": "Swindon Town's 1993/94 campaign saw them concede 100 goals, the most in a single Premier League season."
},

"Fewest Goals Conceded": {
  "title": "Fewest Goals Conceded",
  "topFive": [
    { "team": "Chelsea", "value": "15 goals", "years": "2004/05" },
    { "team": "Manchester United", "value": "17 goals", "years": "2008/09" },
    { "team": "Arsenal", "value": "17 goals", "years": "1998/99" },
    { "team": "Liverpool", "value": "22 goals", "years": "2018/19" },
    { "team": "Chelsea", "value": "22 goals", "years": "2005/06" }
  ],
  "additionalInfo": "Chelsea’s defense under José Mourinho in the 2004/05 season set a record by conceding just 15 goals in 38 games, the fewest in Premier League history."
    },

    "Most Wins in a Season": {
  "title": "Most Wins in a Season",
  "topFive": [
    { "team": "Manchester City", "value": "32 wins", "years": "2017/18" },
    { "team": "Liverpool", "value": "32 wins", "years": "2019/20" },
    { "team": "Manchester City", "value": "32 wins", "years": "2018/19" },
    { "team": "Chelsea", "value": "30 wins", "years": "2016/17" },
    { "team": "Manchester City", "value": "30 wins", "years": "2020/21" }
  ],
  "additionalInfo": "Manchester City and Liverpool share the record for most wins in a Premier League season with 32 victories."
},

"Most Home Wins in a Season": {
  "title": "Most Home Wins in a Season",
  "topFive": [
    { "team": "Chelsea", "value": "18 wins", "years": "2005/06" },
    { "team": "Manchester United", "value": "18 wins", "years": "2010/11" },
    { "team": "Manchester City", "value": "18 wins", "years": "2011/12" },
    { "team": "Liverpool", "value": "18 wins", "years": "2019/20" },
    { "team": "Manchester City", "value": "18 wins", "years": "2018/19" }
  ],
  "additionalInfo": "Chelsea's 2005/06 campaign set the tone for home dominance, with multiple teams later equaling the record of 18 home wins."
},

"Most Away Wins in a Season": {
  "title": "Most Away Wins in a Season",
  "topFive": [
    { "team": "Manchester City", "value": "16 wins", "years": "2017/18" },
    { "team": "Manchester City", "value": "16 wins", "years": "2020/21" },
    { "team": "Chelsea", "value": "15 wins", "years": "2004/05" },
    { "team": "Manchester City", "value": "15 wins", "years": "2011/12" },
    { "team": "Liverpool", "value": "15 wins", "years": "2019/20" }
  ],
  "additionalInfo": "Manchester City holds the record for most away wins in a season, achieving 16 victories in both 2017/18 and 2020/21."
},

"Most Consecutive Wins": {
  "title": "Most Consecutive Wins",
  "topFive": [
    { "team": "Manchester City", "value": "18 wins", "years": "2017/18" },
    { "team": "Liverpool", "value": "18 wins", "years": "2019/20" },
    { "team": "Manchester City", "value": "15 wins", "years": "2018/19" },
    { "team": "Arsenal", "value": "14 wins", "years": "2001/02" },
    { "team": "Chelsea", "value": "13 wins", "years": "2016/17" }
  ],
  "additionalInfo": "Manchester City and Liverpool share the record for most consecutive wins, with both teams managing 18 straight victories."
},

"Most Consecutive Home Wins": {
  "title": "Most Consecutive Home Wins",
  "topFive": [
    { "team": "Liverpool", "value": "24 wins", "years": "2019/20" },
    { "team": "Manchester City", "value": "20 wins", "years": "2011/12" },
    { "team": "Manchester United", "value": "19 wins", "years": "2010/11" },
    { "team": "Chelsea", "value": "17 wins", "years": "2005/06" },
    { "team": "Manchester City", "value": "16 wins", "years": "2018/19" }
  ],
  "additionalInfo": "Liverpool's Anfield fortress in the 2019/20 season saw them win 24 consecutive home games, a Premier League record."
},

"Most Consecutive Away Wins": {
  "title": "Most Consecutive Away Wins",
  "topFive": [
    { "team": "Manchester City", "value": "12 wins", "years": "2020/21" },
    { "team": "Chelsea", "value": "11 wins", "years": "2007/08" },
    { "team": "Manchester City", "value": "11 wins", "years": "2017/18" },
    { "team": "Liverpool", "value": "10 wins", "years": "2019/20" },
    { "team": "Arsenal", "value": "9 wins", "years": "2001/02" }
  ],
  "additionalInfo": "Manchester City holds the record for most consecutive away wins, achieving 12 in a row during the 2020/21 season."
},

"Longest Unbeaten Run": {
  "title": "Longest Unbeaten Run",
  "topFive": [
    { "team": "Arsenal", "value": "49 games", "years": "2003/04" },
    { "team": "Chelsea", "value": "40 games", "years": "2004/05" },
    { "team": "Liverpool", "value": "44 games", "years": "2019/20" },
    { "team": "Manchester United", "value": "37 games", "years": "1998/99" },
    { "team": "Manchester City", "value": "30 games", "years": "2017/18" }
  ],
  "additionalInfo": "Arsenal's 49-game unbeaten run remains unmatched, including their 'Invincibles' season in 2003/04."
    },

    "Longest Away Unbeaten Run": {
  "title": "Longest Away Unbeaten Run",
  "topFive": [
    { "team": "Arsenal", "value": "27 games", "years": "2004/05 to 2008/09" },
    { "team": "Manchester City", "value": "22 games", "years": "2018/19 to 2020/21" },
    { "team": "Liverpool", "value": "21 games", "years": "2019/20 to 2020/21" },
    { "team": "Chelsea", "value": "21 games", "years": "2004/05 to 2005/06" },
    { "team": "Manchester United", "value": "19 games", "years": "2010/11 to 2011/12" }
  ],
  "additionalInfo": "Arsenal's remarkable 27-game unbeaten run on the road from 2004 to 2009 remains the longest in Premier League history."
},

"Longest Home Unbeaten Run": {
  "title": "Longest Home Unbeaten Run",
  "topFive": [
    { "team": "Liverpool", "value": "68 games", "years": "2017/18 to 2021/22" },
    { "team": "Chelsea", "value": "86 games", "years": "2004/05 to 2008/09" },
    { "team": "Manchester United", "value": "35 games", "years": "2010/11 to 2012/13" },
    { "team": "Arsenal", "value": "30 games", "years": "2004/05 to 2007/08" },
    { "team": "Manchester City", "value": "22 games", "years": "2017/18 to 2021/22" }
  ],
  "additionalInfo": "Liverpool’s 68-game unbeaten run at Anfield is the longest home unbeaten streak in Premier League history."
},

"Biggest Home Win": {
  "title": "Biggest Home Win",
  "topFive": [
    { "team": "Manchester United", "value": "9-0 vs Ipswich", "years": "1994/95" },
    { "team": "Liverpool", "value": "9-0 vs Bournemouth", "years": "2022/23" },
    { "team": "Leicester City", "value": "9-0 vs Southampton", "years": "2019/20" },
    { "team": "Chelsea", "value": "8-0 vs Wigan", "years": "2009/10" },
    { "team": "Manchester City", "value": "8-0 vs Watford", "years": "2019/20" }
  ],
  "additionalInfo": "Manchester United, Liverpool, and Leicester City share the record for the biggest home win in Premier League history with 9-0 victories."
},

"Biggest Away Win": {
  "title": "Biggest Away Win",
  "topFive": [
    { "team": "Leicester City", "value": "9-0 vs Southampton", "years": "2019/20" },
    { "team": "Manchester United", "value": "8-1 vs Nottingham Forest", "years": "1998/99" },
    { "team": "Chelsea", "value": "6-0 vs Wigan", "years": "2010/11" },
    { "team": "Manchester City", "value": "6-0 vs Watford", "years": "2019/20" },
    { "team": "Tottenham", "value": "6-0 vs Leicester", "years": "2015/16" }
  ],
  "additionalInfo": "Leicester City’s 9-0 win over Southampton in 2019/20 is the biggest away victory in Premier League history."
},

"Most Goals in a Match": {
  "title": "Most Goals in a Match",
  "topFive": [
    { "team": "Portsmouth vs Reading", "value": "11 goals (7-4)", "years": "2007/08" },
    { "team": "Tottenham vs Reading", "value": "10 goals (6-4)", "years": "2007/08" },
    { "team": "Arsenal vs Newcastle", "value": "10 goals (7-3)", "years": "2012/13" },
    { "team": "West Brom vs Man United", "value": "10 goals (5-5)", "years": "2012/13" },
    { "team": "Liverpool vs Arsenal", "value": "10 goals (5-5)", "years": "2019/20" }
  ],
  "additionalInfo": "Portsmouth’s 7-4 victory over Reading in 2007/08 holds the record for most goals in a Premier League match."
},

"Fastest Goal": {
  "title": "Fastest Goal",
  "topFive": [
    { "team": "Southampton (Shane Long)", "value": "7.69 seconds", "years": "2018/19" }
  ],
  "additionalInfo": "Shane Long’s goal for Southampton after just 7.69 seconds against Watford in 2018/19 is the fastest goal in Premier League history."
    },

    "Most Consecutive Appearances": {
      "title": "Most Consecutive Appearances",
      "topFive": [
        { "player": "Brad Friedel", "value": "310 consecutive appearances", "years": "2004-2012" },
        { "player": "Frank Lampard", "value": "164 consecutive appearances", "years": "2001-2005" },
        { "player": "Wayne Bridge", "value": "113 consecutive appearances", "years": "2001-2004" },
        { "player": "Matt Holland", "value": "115 consecutive appearances", "years": "2000-2004" },
        { "player": "Jonathan Walters", "value": "102 consecutive appearances", "years": "2011-2014" }
      ],
      "additionalInfo": "Brad Friedel holds the record for the most consecutive Premier League appearances, playing 310 games in a row as a goalkeeper for Blackburn, Aston Villa, and Tottenham."
    },
  "Most Appearances": {
  "title": "Most Appearances",
  "topFive": [
    { "player": "Gareth Barry", "value": "653 appearances", "years": "1997-2018" },
    { "player": "Ryan Giggs", "value": "632 appearances", "years": "1992-2014" },
    { "player": "Frank Lampard", "value": "609 appearances", "years": "1995-2015" },
    { "player": "James Milner", "value": "625 appearances", "years": "2002-present" },
    { "player": "David James", "value": "572 appearances", "years": "1992-2010" }
  ],
  "additionalInfo": "Gareth Barry holds the record for the most Premier League appearances, featuring in 653 matches across multiple clubs, including Aston Villa, Manchester City, and West Bromwich Albion."
},

"Most Appearances for One Club": {
  "title": "Most Appearances for One Club",
  "topFive": [
    { "player": "Ryan Giggs", "team": "Manchester United", "value": "632 appearances", "years": "1992-2014" },
    { "player": "Steven Gerrard", "team": "Liverpool", "value": "504 appearances", "years": "1998-2015" },
    { "player": "Jamie Carragher", "team": "Liverpool", "value": "508 appearances", "years": "1996-2013" },
    { "player": "Frank Lampard", "team": "Chelsea", "value": "429 appearances", "years": "2001-2014" },
    { "player": "John Terry", "team": "Chelsea", "value": "492 appearances", "years": "1998-2017" }
  ],
  "additionalInfo": "Ryan Giggs played his entire Premier League career at Manchester United, making a record 632 appearances for a single club."
    },
  "Youngest Player": {
  "title": "Youngest Player",
  "topFive": [
    { "player": "Ethan Nwaneri", "team": "Arsenal", "value": "15 years, 181 days", "years": "2022" },
    { "player": "Harvey Elliott", "team": "Fulham", "value": "16 years, 30 days", "years": "2019" },
    { "player": "Matthew Briggs", "team": "Fulham", "value": "16 years, 65 days", "years": "2007" },
    { "player": "Izzy Brown", "team": "West Brom", "value": "16 years, 117 days", "years": "2013" },
    { "player": "Aaron Lennon", "team": "Leeds United", "value": "16 years, 129 days", "years": "2003" }
  ],
  "additionalInfo": "Ethan Nwaneri became the youngest player in Premier League history at just 15 years and 181 days when he made his debut for Arsenal in 2022."
},

"Oldest Player": {
  "title": "Oldest Player",
  "topFive": [
    { "player": "John Burridge", "team": "Manchester City", "value": "43 years, 163 days", "years": "1995" },
    { "player": "Alec Chamberlain", "team": "Watford", "value": "42 years, 327 days", "years": "2007" },
    { "player": "Steve Ogrizovic", "team": "Coventry City", "value": "42 years, 236 days", "years": "2000" },
    { "player": "Jens Lehmann", "team": "Arsenal", "value": "41 years, 151 days", "years": "2011" },
    { "player": "Edwin van der Sar", "team": "Manchester United", "value": "40 years, 205 days", "years": "2011" }
  ],
  "additionalInfo": "John Burridge is the oldest player to ever feature in a Premier League match, playing for Manchester City at 43 years and 163 days old."
},

"All-Time Top Scorer": {
  "title": "All-Time Top Scorer",
  "topFive": [
    { "player": "Alan Shearer", "value": "260 goals", "years": "1992-2006" },
    { "player": "Harry Kane", "value": "213 goals", "years": "2012-2023" },
    { "player": "Wayne Rooney", "value": "208 goals", "years": "2002-2018" },
    { "player": "Andrew Cole", "value": "187 goals", "years": "1993-2008" },
    { "player": "Sergio Agüero", "value": "184 goals", "years": "2011-2021" }
  ],
  "additionalInfo": "Alan Shearer remains the Premier League's all-time top scorer with 260 goals, achieved across spells with Blackburn Rovers and Newcastle United."
},

"Most Goals for One Club": {
  "title": "Most Goals for One Club",
  "topFive": [
    { "player": "Harry Kane", "team": "Tottenham Hotspur", "value": "213 goals", "years": "2012-2023" },
    { "player": "Sergio Agüero", "team": "Manchester City", "value": "184 goals", "years": "2011-2021" },
    { "player": "Wayne Rooney", "team": "Manchester United", "value": "183 goals", "years": "2004-2018" },
    { "player": "Thierry Henry", "team": "Arsenal", "value": "175 goals", "years": "1999-2012" },
    { "player": "Frank Lampard", "team": "Chelsea", "value": "147 goals", "years": "2001-2014" }
  ],
  "additionalInfo": "Harry Kane holds the record for most Premier League goals for a single club, scoring 213 goals for Tottenham Hotspur."
},

"Most Goals in a Season by Player": {
  "title": "Most Goals in a Season",
  "topFive": [
    { "player": "Erling Haaland", "team": "Manchester City", "value": "36 goals", "years": "2022-23" },
    { "player": "Mohamed Salah", "team": "Liverpool", "value": "32 goals", "years": "2017-18" },
    { "player": "Cristiano Ronaldo", "team": "Manchester United", "value": "31 goals", "years": "2007-08" },
    { "player": "Luis Suárez", "team": "Liverpool", "value": "31 goals", "years": "2013-14" },
    { "player": "Alan Shearer", "team": "Blackburn Rovers", "value": "31 goals", "years": "1995-96" }
  ],
  "additionalInfo": "Erling Haaland broke the Premier League record for most goals in a season with 36 goals in 2022-23."
},

"Most Hat-tricks": {
  "title": "Most Hat-tricks",
  "topFive": [
    { "player": "Sergio Agüero", "value": "12 hat-tricks", "years": "2011-2021" },
    { "player": "Alan Shearer", "value": "11 hat-tricks", "years": "1992-2006" },
    { "player": "Robbie Fowler", "value": "9 hat-tricks", "years": "1993-2007" },
    { "player": "Thierry Henry", "value": "8 hat-tricks", "years": "1999-2012" },
    { "player": "Harry Kane", "value": "8 hat-tricks", "years": "2012-2023" }
  ],
  "additionalInfo": "Sergio Agüero holds the record for most Premier League hat-tricks with 12, all scored for Manchester City."
},

"Fastest Hat-trick": {
  "title": "Fastest Hat-trick",
  "topFive": [
    { "player": "Sadio Mané", "team": "Southampton", "value": "2 minutes 56 seconds", "years": "2015" }
  ],
  "additionalInfo": "Sadio Mané scored the fastest hat-trick in Premier League history in just 2 minutes and 56 seconds against Aston Villa in 2015."
},

"Most Goals in a Match by Player": {
  "title": "Most Goals in a Match",
  "topFive": [
    { "player": "Andy Cole", "team": "Manchester United", "value": "5 goals", "years": "1995" },
    { "player": "Alan Shearer", "team": "Newcastle United", "value": "5 goals", "years": "1999" },
    { "player": "Jermain Defoe", "team": "Tottenham", "value": "5 goals", "years": "2009" },
    { "player": "Dimitar Berbatov", "team": "Manchester United", "value": "5 goals", "years": "2010" },
    { "player": "Sergio Agüero", "team": "Manchester City", "value": "5 goals", "years": "2015" }
  ],
  "additionalInfo": "Several players have scored five goals in a single Premier League match, but no player has ever scored six."
    },
"Fastest 50 Goals": {
  "title": "Fastest 50 Goals",
  "topFive": [
    { "player": "Erling Haaland", "team": "Manchester City", "value": "48 games", "years": "2022-2024" },
    { "player": "Andy Cole", "team": "Newcastle United", "value": "65 games", "years": "1993-1995" },
    { "player": "Alan Shearer", "team": "Blackburn Rovers", "value": "66 games", "years": "1992-1995" },
    { "player": "Ruud van Nistelrooy", "team": "Manchester United", "value": "68 games", "years": "2001-2003" },
    { "player": "Fernando Torres", "team": "Liverpool", "value": "72 games", "years": "2007-2009" }
  ],
  "additionalInfo": "Erling Haaland became the fastest player to score 50 Premier League goals, reaching the milestone in just 48 games for Manchester City."
},

"Fastest 100 Goals": {
  "title": "Fastest 100 Goals",
  "topFive": [
    { "player": "Alan Shearer", "team": "Blackburn Rovers", "value": "124 games", "years": "1992-1995" },
    { "player": "Harry Kane", "team": "Tottenham Hotspur", "value": "141 games", "years": "2012-2018" },
    { "player": "Sergio Agüero", "team": "Manchester City", "value": "147 games", "years": "2011-2018" },
    { "player": "Thierry Henry", "team": "Arsenal", "value": "160 games", "years": "1999-2005" },
    { "player": "Mohamed Salah", "team": "Liverpool", "value": "162 games", "years": "2017-2022" }
  ],
  "additionalInfo": "Alan Shearer holds the record for the fastest 100 Premier League goals, achieving the feat in just 124 matches for Blackburn Rovers."
},

"Most Assists All-Time": {
  "title": "Most Assists All-Time",
  "topFive": [
    { "player": "Ryan Giggs", "team": "Manchester United", "value": "162 assists", "years": "1992-2014" },
    { "player": "Cesc Fàbregas", "team": "Arsenal & Chelsea", "value": "111 assists", "years": "2004-2019" },
    { "player": "Wayne Rooney", "team": "Manchester United", "value": "103 assists", "years": "2002-2018" },
    { "player": "Frank Lampard", "team": "Chelsea", "value": "102 assists", "years": "2001-2014" },
    { "player": "Kevin De Bruyne", "team": "Manchester City", "value": "105 assists", "years": "2015-present" }
  ],
  "additionalInfo": "Ryan Giggs holds the all-time Premier League assist record with 162 assists, all for Manchester United."
},

"Most Assists in a Season": {
  "title": "Most Assists in a Season",
  "topFive": [
    { "player": "Thierry Henry", "team": "Arsenal", "value": "20 assists", "years": "2002-03" },
    { "player": "Kevin De Bruyne", "team": "Manchester City", "value": "20 assists", "years": "2019-20" },
    { "player": "Mesut Özil", "team": "Arsenal", "value": "19 assists", "years": "2015-16" },
    { "player": "Frank Lampard", "team": "Chelsea", "value": "18 assists", "years": "2004-05" },
    { "player": "Cesc Fàbregas", "team": "Arsenal", "value": "18 assists", "years": "2007-08" }
  ],
  "additionalInfo": "Thierry Henry and Kevin De Bruyne share the record for most assists in a single Premier League season, with 20 each."
},

"Most Clean Sheets": {
  "title": "Most Clean Sheets",
  "topFive": [
    { "player": "Petr Čech", "teams": "Chelsea & Arsenal", "value": "202 clean sheets", "years": "2004-2019" },
    { "player": "David James", "teams": "Liverpool & Manchester City", "value": "169 clean sheets", "years": "1992-2010" },
    { "player": "Mark Schwarzer", "teams": "Middlesbrough & Fulham", "value": "151 clean sheets", "years": "1996-2016" },
    { "player": "David de Gea", "team": "Manchester United", "value": "147 clean sheets", "years": "2011-2023" },
    { "player": "David Seaman", "team": "Arsenal", "value": "140 clean sheets", "years": "1992-2004" }
  ],
  "additionalInfo": "Petr Čech holds the record for the most Premier League clean sheets, keeping 202 across his time with Chelsea and Arsenal."
},

"Most Clean Sheets in a Season": {
  "title": "Most Clean Sheets in a Season",
  "topFive": [
    { "player": "Petr Čech", "team": "Chelsea", "value": "24 clean sheets", "years": "2004-05" },
    { "player": "Edwin van der Sar", "team": "Manchester United", "value": "21 clean sheets", "years": "2008-09" },
    { "player": "Pepe Reina", "team": "Liverpool", "value": "20 clean sheets", "years": "2005-06" },
    { "player": "Joe Hart", "team": "Manchester City", "value": "18 clean sheets", "years": "2010-11" },
    { "player": "David de Gea", "team": "Manchester United", "value": "18 clean sheets", "years": "2017-18" }
  ],
  "additionalInfo": "Petr Čech set the record for most clean sheets in a single Premier League season, keeping 24 shutouts in Chelsea’s 2004-05 title-winning campaign."
},

"Most Golden Gloves": {
  "title": "Most Golden Gloves",
  "topFive": [
    { "player": "Joe Hart", "team": "Manchester City", "value": "4 awards", "years": "2010-2015" },
    { "player": "Petr Čech", "teams": "Chelsea & Arsenal", "value": "4 awards", "years": "2004-2016" },
    { "player": "Pepe Reina", "team": "Liverpool", "value": "3 awards", "years": "2005-2008" },
    { "player": "Alisson Becker", "team": "Liverpool", "value": "2 awards", "years": "2018-present" },
    { "player": "David de Gea", "team": "Manchester United", "value": "2 awards", "years": "2011-2023" }
  ],
  "additionalInfo": "Joe Hart and Petr Čech are tied for the most Golden Glove awards, each winning it four times."
},

"Most Golden Boots": {
  "title": "Most Golden Boots",
  "topFive": [
    { "player": "Thierry Henry", "team": "Arsenal", "value": "4 awards", "years": "1999-2012" },
    { "player": "Alan Shearer", "team": "Blackburn Rovers", "value": "3 awards", "years": "1992-2006" },
    { "player": "Harry Kane", "team": "Tottenham Hotspur", "value": "3 awards", "years": "2012-2023" },
    { "player": "Mohamed Salah", "team": "Liverpool", "value": "3 awards", "years": "2017-present" },
    { "player": "Robin van Persie", "team": "Arsenal & Manchester United", "value": "2 awards", "years": "2004-2015" }
  ],
  "additionalInfo": "Thierry Henry holds the record for most Golden Boot awards, winning four during his time at Arsenal."
    },
"Most Penalties Saved": {
  "title": "Most Penalties Saved",
  "topFive": [
    { "player": "David James", "teams": "Liverpool & Manchester City", "value": "13 penalties saved", "years": "1992-2010" },
    { "player": "Heurelho Gomes", "teams": "Tottenham Hotspur & Watford", "value": "12 penalties saved", "years": "2008-2019" },
    { "player": "Jussi Jääskeläinen", "teams": "Bolton Wanderers & West Ham", "value": "11 penalties saved", "years": "1997-2015" },
    { "player": "Lukasz Fabianski", "teams": "Swansea City & West Ham", "value": "10 penalties saved", "years": "2014-present" },
    { "player": "Shay Given", "teams": "Newcastle United & Manchester City", "value": "10 penalties saved", "years": "1997-2016" }
  ],
  "additionalInfo": "David James holds the record for the most penalties saved in Premier League history, stopping 13 spot-kicks across his career."
},

"Most Player of the Season Awards": {
  "title": "Most Player of the Season Awards",
  "topFive": [
    { "player": "Cristiano Ronaldo", "teams": "Manchester United", "value": "2 awards", "years": "2006-07, 2007-08" },
    { "player": "Thierry Henry", "teams": "Arsenal", "value": "2 awards", "years": "2003-04, 2005-06" },
    { "player": "Nemanja Vidić", "teams": "Manchester United", "value": "2 awards", "years": "2008-09, 2010-11" },
    { "player": "Kevin De Bruyne", "teams": "Manchester City", "value": "2 awards", "years": "2019-20, 2021-22" },
    { "player": "Wayne Rooney", "teams": "Manchester United", "value": "1 award", "years": "2009-10" }
  ],
  "additionalInfo": "Cristiano Ronaldo, Thierry Henry, Nemanja Vidić, and Kevin De Bruyne share the record for the most Premier League Player of the Season awards, winning twice each."
},

"Most Player of the Month Awards": {
  "title": "Most Player of the Month Awards",
  "topFive": [
    { "player": "Sergio Agüero", "teams": "Manchester City", "value": "7 awards", "years": "2011-2021" },
    { "player": "Harry Kane", "teams": "Tottenham Hotspur", "value": "7 awards", "years": "2012-2023" },
    { "player": "Steven Gerrard", "teams": "Liverpool", "value": "6 awards", "years": "1998-2015" },
    { "player": "Cristiano Ronaldo", "teams": "Manchester United", "value": "6 awards", "years": "2003-2009, 2021-22" },
    { "player": "Robin van Persie", "teams": "Arsenal & Manchester United", "value": "5 awards", "years": "2004-2015" }
  ],
  "additionalInfo": "Sergio Agüero and Harry Kane hold the record for the most Premier League Player of the Month awards, winning seven each."
},

"Most Assists in a Match": {
  "title": "Most Assists in a Match",
  "topFive": [
    { "player": "Dennis Bergkamp", "team": "Arsenal", "value": "4 assists", "years": "1999-2000" },
    { "player": "José Antonio Reyes", "team": "Arsenal", "value": "4 assists", "years": "2006-07" },
    { "player": "Cesc Fàbregas", "team": "Arsenal", "value": "4 assists", "years": "2009-10" },
    { "player": "Santi Cazorla", "team": "Arsenal", "value": "4 assists", "years": "2012-13" },
    { "player": "Harry Kane", "team": "Tottenham Hotspur", "value": "4 assists", "years": "2020-21" }
  ],
  "additionalInfo": "Multiple players share the record for most assists in a single Premier League match, with Dennis Bergkamp, Cesc Fàbregas, and Harry Kane among those registering four assists."
},

"Most Chances Created": {
  "title": "Most Chances Created",
  "topFive": [
    { "player": "Mesut Özil", "team": "Arsenal", "value": "146 chances", "years": "2015-16" },
    { "player": "Dimitri Payet", "team": "West Ham United", "value": "119 chances", "years": "2015-16" },
    { "player": "Kevin De Bruyne", "team": "Manchester City", "value": "111 chances", "years": "2019-20" },
    { "player": "Cesc Fàbregas", "team": "Chelsea", "value": "108 chances", "years": "2014-15" },
    { "player": "Eden Hazard", "team": "Chelsea", "value": "98 chances", "years": "2018-19" }
  ],
  "additionalInfo": "Mesut Özil set the Premier League record for the most chances created in a single season, with 146 for Arsenal in 2015-16."
    },
"Earliest Title Win": {
  "title": "Earliest Title Win",
  "topFive": [
    { "team": "Manchester United", "value": "April 14", "years": "2000-01" },
    { "team": "Manchester United", "value": "April 22", "years": "2012-13" },
    { "team": "Arsenal", "value": "April 25", "years": "2003-04" },
    { "team": "Manchester City", "value": "April 15", "years": "2017-18" },
    { "team": "Liverpool", "value": "June 25", "years": "2019-20 (COVID-19 delay)" }
  ],
  "additionalInfo": "Manchester United's 2000-01 title win remains the earliest secured in Premier League history, clinching the title with five games to spare."
},

"Latest Title Win": {
  "title": "Latest Title Win",
  "topFive": [
    { "team": "Manchester City", "value": "May 26", "years": "2022-23" },
    { "team": "Chelsea", "value": "May 21", "years": "2009-10" },
    { "team": "Manchester United", "value": "May 21", "years": "2007-08" },
    { "team": "Manchester City", "value": "May 19", "years": "2018-19" },
    { "team": "Arsenal", "value": "May 17", "years": "1997-98" }
  ],
  "additionalInfo": "Manchester City’s 2022-23 title win was the latest confirmed in Premier League history, taking place on May 26 due to fixture scheduling."
},

"Biggest Title-Winning Margin": {
  "title": "Biggest Title-Winning Margin",
  "topFive": [
    { "team": "Manchester City", "value": "19 points", "years": "2017-18" },
    { "team": "Manchester United", "value": "18 points", "years": "1999-00" },
    { "team": "Liverpool", "value": "18 points", "years": "2019-20" },
    { "team": "Chelsea", "value": "15 points", "years": "2004-05" },
    { "team": "Arsenal", "value": "11 points", "years": "2003-04" }
  ],
  "additionalInfo": "Manchester City won the 2017-18 title with a record-breaking 19-point gap over second-placed Manchester United."
},

"Smallest Title-Winning Margin": {
  "title": "Smallest Title-Winning Margin",
  "topFive": [
    { "team": "Manchester City", "value": "0 points (goal difference)", "years": "2011-12" },
    { "team": "Manchester United", "value": "1 point", "years": "1995-96" },
    { "team": "Arsenal", "value": "1 point", "years": "1988-89 (pre-PL era)" },
    { "team": "Chelsea", "value": "2 points", "years": "2009-10" },
    { "team": "Manchester City", "value": "2 points", "years": "2013-14" }
  ],
  "additionalInfo": "Manchester City’s iconic 2011-12 title win remains the only one decided on goal difference, edging out Manchester United."
},

"Most Different Scorers": {
  "title": "Most Different Scorers",
  "topFive": [
    { "team": "Manchester United", "value": "20 players", "years": "2019-20" },
    { "team": "Chelsea", "value": "19 players", "years": "2016-17" },
    { "team": "Arsenal", "value": "19 players", "years": "2009-10" },
    { "team": "Manchester City", "value": "18 players", "years": "2017-18" },
    { "team": "Liverpool", "value": "17 players", "years": "2021-22" }
  ],
  "additionalInfo": "Manchester United set the record for most different goalscorers in a single season with 20 players finding the net in 2019-20."
    },
"Most Goals in a Season by player": {
  "title": "Most Goals in a Season by Players",
  "topFive": [
    { "player": "Erling Haaland", "value": "36 goals", "years": "2022-23" },
    { "player": "Mohamed Salah", "value": "32 goals", "years": "2017-18" },
    { "player": "Luis Suárez", "value": "31 goals", "years": "2013-14" },
    { "player": "Cristiano Ronaldo", "value": "31 goals", "years": "2007-08" },
    { "player": "Alan Shearer", "value": "31 goals", "years": "1995-96" }
  ],
  "additionalInfo": "Erling Haaland broke the Premier League single-season goal record with 36 goals in 2022-23."
},

"Most Home Goals by player": {
  "title": "Most Home Goals by Player",
  "topFive": [
    { "player": "Thierry Henry", "value": "22 goals", "years": "2003-04" },
    { "player": "Alan Shearer", "value": "20 goals", "years": "1995-96" },
    { "player": "Cristiano Ronaldo", "value": "19 goals", "years": "2007-08" },
    { "player": "Mohamed Salah", "value": "18 goals", "years": "2017-18" },
    { "player": "Harry Kane", "value": "17 goals", "years": "2016-17" }
  ],
  "additionalInfo": "Thierry Henry’s 22 home goals in 2003-04 remain the most by any player in a single Premier League season."
},

"Most Away Goals by player": {
  "title": "Most Away Goals by Player",
  "topFive": [
    { "player": "Harry Kane", "value": "17 goals", "years": "2020-21" },
    { "player": "Kevin Phillips", "value": "16 goals", "years": "1999-00" },
    { "player": "Robin van Persie", "value": "16 goals", "years": "2011-12" },
    { "player": "Mohamed Salah", "value": "15 goals", "years": "2017-18" },
    { "player": "Erling Haaland", "value": "15 goals", "years": "2022-23" }
  ],
  "additionalInfo": "Harry Kane set the record for most away goals in a single Premier League season with 17 in 2020-21."
},

"Most Consecutive Scoring Games by player": {
  "title": "Most Consecutive Scoring Games by Player",
  "topFive": [
    { "player": "Jamie Vardy", "value": "11 games", "years": "2015-16" },
    { "player": "Ruud van Nistelrooy", "value": "10 games", "years": "2002-03" },
    { "player": "Cristiano Ronaldo", "value": "10 games", "years": "2007-08" },
    { "player": "Mohamed Salah", "value": "10 games", "years": "2021-22" },
    { "player": "Daniel Sturridge", "value": "9 games", "years": "2013-14" }
  ],
  "additionalInfo": "Jamie Vardy holds the record for most consecutive Premier League games scored in, netting in 11 straight matches during Leicester's 2015-16 title-winning campaign."
},

"Most Goals in a Calendar Year by player": {
  "title": "Most Goals in a Calendar Year by Player",
  "topFive": [
    { "player": "Harry Kane", "value": "39 goals", "years": "2017" },
    { "player": "Alan Shearer", "value": "36 goals", "years": "1995" },
    { "player": "Thierry Henry", "value": "34 goals", "years": "2004" },
    { "player": "Robin van Persie", "value": "35 goals", "years": "2011" },
    { "player": "Mohamed Salah", "value": "32 goals", "years": "2018" }
  ],
  "additionalInfo": "Harry Kane set the record for most Premier League goals in a calendar year, scoring 39 times in 2017."
},

"Most Opening Day Goals by player": {
  "title": "Most Opening Day Goals by Player",
  "topFive": [
    { "player": "Wayne Rooney", "value": "8 goals", "years": "2002-2018" },
    { "player": "Frank Lampard", "value": "8 goals", "years": "1997-2015" },
    { "player": "Alan Shearer", "value": "7 goals", "years": "1992-2006" },
    { "player": "Mohamed Salah", "value": "7 goals", "years": "2017-2023" },
    { "player": "Sergio Agüero", "value": "7 goals", "years": "2011-2019" }
  ],
  "additionalInfo": "Wayne Rooney and Frank Lampard share the record for most goals scored on Premier League opening days, with 8 each."
},

"Most Goals in London Derbies by player": {
  "title": "Most Goals in London Derbies by Player",
  "topFive": [
    { "player": "Harry Kane", "value": "47 goals", "years": "2014-present" },
    { "player": "Thierry Henry", "value": "43 goals", "years": "1999-2007" },
    { "player": "Frank Lampard", "value": "32 goals", "years": "2001-2014" },
    { "player": "Didier Drogba", "value": "32 goals", "years": "2004-2015" },
    { "player": "Jermain Defoe", "value": "28 goals", "years": "1999-2014" }
  ],
  "additionalInfo": "Harry Kane holds the record for most goals in London derbies, scoring 47 across his time at Tottenham."
},

"Most Goals by Promoted Team": {
  "title": "Most Goals by a Promoted Team",
  "topFive": [
    { "team": "Sunderland", "value": "91 goals", "years": "1999-00" },
    { "team": "Newcastle United", "value": "82 goals", "years": "1993-94" },
    { "team": "Nottingham Forest", "value": "77 goals", "years": "1994-95" },
    { "team": "Ipswich Town", "value": "66 goals", "years": "2000-01" },
    { "team": "Leeds United", "value": "62 goals", "years": "2020-21" }
  ],
  "additionalInfo": "Sunderland set the record for most goals scored by a promoted team, netting 91 in the 1999-00 season."
},
  "Fewest Defeats in a Season": {
    "title": "Fewest Defeats in a Season",
    "topFive": [
      { "team": "Arsenal", "value": "0 defeats", "years": "2003-04" }
    ],
    "additionalInfo": "Arsenal's 'Invincibles' went unbeaten throughout the 2003-04 Premier League season, achieving 26 wins and 12 draws."
  },
  "Most Draws in a Season": {
    "title": "Most Draws in a Season",
    "topFive": [
      { "team": "Manchester City", "value": "18 draws", "years": "1993-94" },
      { "team": "Sheffield United", "value": "18 draws", "years": "1993-94" },
      { "team": "Southampton", "value": "18 draws", "years": "1994-95" },
      { "team": "Newcastle United", "value": "17 draws", "years": "2003-04" },
      { "team": "Aston Villa", "value": "17 draws", "years": "2006-07" }
    ],
    "additionalInfo": "Manchester City, Sheffield United, and Southampton share the record for most draws in a Premier League season, each with 18."
  },
  "Fewest Wins in a Season": {
    "title": "Fewest Wins in a Season",
    "topFive": [
      { "team": "Derby County", "value": "1 win", "years": "2007-08" },
      { "team": "Sunderland", "value": "2 wins", "years": "2005-06" },
      { "team": "Watford", "value": "5 wins", "years": "1999-2000" },
      { "team": "Huddersfield Town", "value": "3 wins", "years": "2018-19" },
      { "team": "Aston Villa", "value": "3 wins", "years": "2015-16" }
    ],
    "additionalInfo": "Derby County holds the record for the fewest wins in a Premier League season, securing only one victory in the 2007-08 campaign."
  },
  "Most Losses in a Season": {
    "title": "Most Losses in a Season",
    "topFive": [
      { "team": "Ipswich Town", "value": "29 losses", "years": "1994-95" },
      { "team": "Sunderland", "value": "29 losses", "years": "2005-06" },
      { "team": "Derby County", "value": "29 losses", "years": "2007-08" },
      { "team": "Huddersfield Town", "value": "28 losses", "years": "2018-19" },
      { "team": "Aston Villa", "value": "27 losses", "years": "2015-16" }
    ],
    "additionalInfo": "Ipswich Town, Sunderland, and Derby County share the record for the most losses in a Premier League season, each with 29."
  },
  "Fastest Premier League Goal": {
    "title": "Fastest Premier League Goal",
    "topFive": [
      { "player": "Shane Long", "team": "Southampton", "value": "7.69 seconds", "years": "2018-19" },
      { "player": "Ledley King", "team": "Tottenham Hotspur", "value": "10 seconds", "years": "2000-01" },
      { "player": "Alan Shearer", "team": "Newcastle United", "value": "10.52 seconds", "years": "2002-03" },
      { "player": "Christian Eriksen", "team": "Tottenham Hotspur", "value": "10.54 seconds", "years": "2017-18" },
      { "player": "Abdoulaye Doucouré", "team": "Everton", "value": "10.18 seconds", "years": "2024-25" }
    ],
    "additionalInfo": "Shane Long holds the record for the fastest Premier League goal, scoring just 7.69 seconds into the match for Southampton against Watford on April 23, 2019."
  },
  "Latest Premier League Goal": {
    "title": "Latest Premier League Goal",
    "topFive": [
      { "player": "Oli McBurnie", "team": "Sheffield United", "value": "103rd minute", "years": "2023-24" }
    ],
    "additionalInfo": "Oli McBurnie scored the latest goal in Premier League history, netting in the 103rd minute for Sheffield United against West Ham United on January 21, 2024."
  },
  "Most Substitution Appearances": {
    "title": "Most Substitution Appearances",
    "topFive": [
      { "player": "Jermain Defoe", "value": "149 appearances", "years": "1999-2018" },
      { "player": "Peter Crouch", "value": "145 appearances", "years": "2000-2019" },
      { "player": "Shola Ameobi", "value": "142 appearances", "years": "2000-2014" },
      { "player": "Theo Walcott", "value": "130 appearances", "years": "2006-2021" },
      { "player": "Joe Cole", "value": "123 appearances", "years": "1998-2016" }
    ],
    "additionalInfo": "Jermain Defoe holds the record for the most Premier League appearances as a substitute, coming off the bench 149 times during his career."
  },
  "Most Different Clubs": {
    "title": "Most Different Clubs Played For",
    "topFive": [
      { "player": "Marcus Bent", "value": "8 clubs", "years": "1997-2011" },
      { "player": "Andy Cole", "value": "7 clubs", "years": "1993-2008" },
      { "player": "Craig Bellamy", "value": "7 clubs", "years": "1998-2014" },
      { "player": "Wayne Routledge", "value": "7 clubs", "years": "2004-2018" },
      { "player": "Robbie Keane", "value": "6 clubs", "years": "1999-2012" }
    ],
    "additionalInfo": "Marcus Bent has played for the most different clubs in Premier League history, representing eight teams throughout his career."
  }
// Add more record details as needed
  };

  const teamRecords = [
    // Titles & Points
    { category: "Most Premier League Titles", record: "Manchester United", value: "13 titles (1992-93 to 2012-13)" },
    { category: "Most Points in a Season", record: "Manchester City", value: "100 points (2017-18)" },
    { category: "Most Points Without Winning Title", record: "Liverpool", value: "97 points (2018-19)" },
    { category: "Fewest Points in a Season", record: "Derby County", value: "11 points (2007-08)" },
    { category: "Most Home Points in a Season", record: "Chelsea", value: "55 points (2005-06)" },
    { category: "Most Away Points in a Season", record: "Manchester City", value: "50 points (2017-18)" },
    
    // Goals
    { category: "Most Goals in a Season", record: "Manchester City", value: "106 goals (2017-18)" },
    { category: "Fewest Goals in a Season", record: "Derby County", value: "20 goals (2007-08)" },
    { category: "Most Goals Conceded", record: "Swindon Town", value: "100 goals (1993-94)" },
    { category: "Fewest Goals Conceded", record: "Chelsea", value: "15 goals (2004-05)" },
    
    // Wins & Streaks
    { category: "Most Wins in a Season", record: "Manchester City", value: "32 wins (2017-18, 2018-19)" },
    { category: "Most Home Wins in a Season", record: "Multiple Teams", value: "18 wins" },
    { category: "Most Away Wins in a Season", record: "Manchester City", value: "16 wins (2017-18)" },
    { category: "Most Consecutive Wins", record: "Manchester City", value: "18 matches (26 Aug 2017 to 27 Dec 2017)" },
    { category: "Most Consecutive Home Wins", record: "Liverpool", value: "24 matches (2019-20)" },
    { category: "Most Consecutive Away Wins", record: "Manchester City", value: "11 matches (2017)" },
    
    // Unbeaten Records
    { category: "Longest Unbeaten Run", record: "Arsenal", value: "49 matches (2003-04)" },
    { category: "Longest Home Unbeaten Run", record: "Chelsea", value: "86 matches (2004-2008)" },
    { category: "Longest Away Unbeaten Run", record: "Arsenal", value: "27 matches (2001-2004)" },
    
    // Match Records
    { category: "Biggest Home Win", record: "Manchester United", value: "9-0 vs Ipswich Town (1995)" },
    { category: "Biggest Away Win", record: "Leicester City", value: "9-0 vs Southampton (2019)" },
    { category: "Most Goals in a Match", record: "Portsmouth 7-4 Reading", value: "11 goals (2007)" },
    { category: "Fastest Goal", record: "Shane Long", value: "7.69 seconds (Southampton vs Watford, 2019)" }
  ];

  const playerRecords = [
    // Appearances
    { category: "Most Appearances", record: "Gareth Barry", value: "653 appearances" },
    { category: "Most Appearances for One Club", record: "Ryan Giggs", value: "632 appearances (Manchester United)" },
    { category: "Most Consecutive Appearances", record: "Brad Friedel", value: "310 appearances (2004-12)" },
    { category: "Youngest Player", record: "Harvey Elliott", value: "16 years 30 days (Fulham)" },
    { category: "Oldest Player", record: "John Burridge", value: "43 years 162 days (Manchester City)" },
    
    // Goals
    { category: "All-Time Top Scorer", record: "Alan Shearer", value: "260 goals" },
    { category: "Most Goals for One Club", record: "Harry Kane", value: "213 goals (Tottenham)" },
    { category: "Most Goals in a Season by Player", record: "Andy Cole/Alan Shearer", value: "34 goals" },
    { category: "Most Hat-tricks", record: "Sergio Aguero", value: "12 hat-tricks" },
    { category: "Fastest Hat-trick", record: "Sadio Mané", value: "2 minutes 56 seconds" },
    { category: "Most Goals in a Match by Player", record: "Andy Cole/Alan Shearer/Jermain Defoe/Dimitar Berbatov", value: "5 goals" },
    { category: "Fastest 50 Goals", record: "Andy Cole", value: "65 matches" },
    { category: "Fastest 100 Goals", record: "Alan Shearer", value: "124 matches" },
    
    // Assists & Creation
    { category: "Most Assists All-Time", record: "Ryan Giggs", value: "162 assists" },
    { category: "Most Assists in a Season", record: "Thierry Henry/Kevin De Bruyne", value: "20 assists" },
    { category: "Most Chances Created", record: "Cesc Fabregas", value: "845 chances" },
    { category: "Most Assists in a Match", record: "Multiple Players", value: "4 assists" },
    
    // Goalkeeping
    { category: "Most Clean Sheets", record: "Petr Cech", value: "202 clean sheets" },
    { category: "Most Clean Sheets in a Season", record: "Petr Cech", value: "24 (2004-05)" },
    { category: "Most Golden Gloves", record: "Petr Cech", value: "4 awards" },
    { category: "Most Penalties Saved", record: "David James", value: "13 penalties" },
    
    // Awards
    { category: "Most Golden Boots", record: "Thierry Henry", value: "4 awards" },
    { category: "Most Player of the Month Awards", record: "Harry Kane", value: "7 awards" },
    { category: "Most Player of the Season Awards", record: "Thierry Henry", value: "3 awards" }
  ];

  const seasonRecords = [
    // Team Season Records
    { category: "Earliest Title Win", record: "Manchester United", value: "14 April 2001" },
    { category: "Latest Title Win", record: "Manchester City", value: "May 26 2022-23" },
    { category: "Biggest Title-Winning Margin", record: "Manchester City", value: "19 points (2017-18)" },
    { category: "Smallest Title-Winning Margin", record: "Manchester City", value: "Goal difference (+8) over Manchester United (2011-12)" },
    { category: "Most Different Scorers", record: "Manchester United", value: "20 players (2019-20)" },
    
    // Individual Season Records
    { category: "Most Goals in a Season by player", record: "Erling Haaland", value: "36 goals (2022-23)" },
    { category: "Most Home Goals by player", record: "Thierry Henry", value: "22 goals (2003-03)" },
    { category: "Most Away Goals by player", record: "Harry Kane", value: "17 goals (2020-21)" },
    { category: "Most Consecutive Scoring Games by player", record: "Jamie Vardy", value: "11 matches (2015)" },
    { category: "Most Goals in a Calendar Year by player", record: "Harry Kane", value: "39 goals (2017)" },
    { category: "Most Opening Day Goals by player", record: "Alan Shearer", value: "8 goals" },
    { category: "Most Goals in London Derbies by player", record: "Thierry Henry", value: "43 goals" },
    
    // Team Performance Records
    { category: "Most Goals by Promoted Team", record: "Newcastle United", value: "82 goals (1993-94)" },
    { category: "Fewest Defeats in a Season", record: "Arsenal", value: "0 (2003-04)" },
    { category: "Most Draws in a Season", record: "Multiple Teams", value: "18 draws" },
    { category: "Fewest Wins in a Season", record: "Derby County", value: "1 win (2007-08)" },
    { category: "Most Losses in a Season", record: "Multiple Teams", value: "29 losses" },
    
    // Special Records
    { category: "Fastest Premier League Goal", record: "Shane Long", value: "7.69 seconds (2019)" },
    { category: "Latest Premier League Goal", record: "Bruno Fernandes", value: "99:45 (2021)" },
    { category: "Most Substitution Appearances", record: "Peter Crouch", value: "158 appearances" },
    { category: "Most Different Clubs", record: "Marcus Bent", value: "8 clubs" }
  ];

  const filterRecords = (records) => {
    return records.filter(record => 
      record.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.record.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleRecordClick = (record) => {
    if (recordDetails[record.category]) {
      setSelectedRecord(recordDetails[record.category]);
    }
  };

  const closeRecordDetails = () => {
    setSelectedRecord(null);
  };

  const renderRecordList = (records) => (
    <div className="records-grid">
      {filterRecords(records).map((record, index) => (
        <Card 
          key={index} 
          className={`record-card ${recordDetails[record.category] ? 'clickable' : ''}`}
          onClick={() => handleRecordClick(record)}
        >
          <CardHeader className="record-header">
            <CardTitle className="record-title">{record.category}</CardTitle>
          </CardHeader>
          <CardContent className="record-content">
            <div className="record-holder">{record.record}</div>
            <div className="record-value">{record.value}</div>
            {recordDetails[record.category] && (
              <div className="view-more">Click to view top 5 →</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderRecordDetails = () => {
    if (!selectedRecord) return null;

    return (
      <div className={`record-details-overlay ${selectedRecord ? 'active' : ''}`}>
        <div className={`record-details-card ${selectedRecord ? 'active' : ''}`}>
          <div className="record-details-header">
            <h3>{selectedRecord.title}</h3>
            <button className="close-btn" onClick={closeRecordDetails}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="record-details-content">
            <div className="top-five-list">
              {selectedRecord.topFive.map((item, index) => (
                <div key={index} className="top-five-item">
                  <div className="rank">{index + 1}</div>
                  <div className="details">
                    <div className="team">{item.player || item.team}</div>
                    <div className="value">{item.value}</div>
                    <div className="years">{item.years}</div>
                  </div>
                </div>
              ))}
            </div>
            {selectedRecord.additionalInfo && (
              <div className="additional-info">
                <h4>Additional Information</h4>
                <p>{selectedRecord.additionalInfo}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="records-page">
      <Card className="main-card">
        <CardHeader className="main-header">
          <div className="header-content">
            <div className="title-section">
              <Trophy className="trophy-icon" />
              <CardTitle>Premier League Records</CardTitle>
            </div>
            
            <div className="search-section">
              <Search className="search-icon" />
              <Input
                className="search-input"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="main-content">
          <Tabs defaultValue="team" className="records-tabs">
            <TabsList className="tabs-list">
              <TabsTrigger value="team">
                Team Records ({filterRecords(teamRecords).length})
              </TabsTrigger>
              <TabsTrigger value="player">
                Player Records ({filterRecords(playerRecords).length})
              </TabsTrigger>
              <TabsTrigger value="season">
                Season Records ({filterRecords(seasonRecords).length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="team" className="tab-content">
              {renderRecordList(teamRecords)}
            </TabsContent>

            <TabsContent value="player" className="tab-content">
              {renderRecordList(playerRecords)}
            </TabsContent>

            <TabsContent value="season" className="tab-content">
              {renderRecordList(seasonRecords)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {renderRecordDetails()}
    </div>
  );
};

export default RecordsPage;