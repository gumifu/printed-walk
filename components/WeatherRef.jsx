import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  WiDaySunnyOvercast,
  WiRainMix,
  WiDaySunny,
  WiRain,
  WiCloudy,
} from "react-icons/wi";

const WeatherRef = ({ coordinates }) => {
  const [weather, setWeather] = useState("");
  const requestUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&daily=weathercode&timezone=Asia%2FTokyo`;
  // console.log(coordinates);

  useEffect(() => {
    axios
      .get(requestUrl)
      .then(function (response) {
        // リクエスト成功時の処理（responseに結果が入っている）
        const weatherRes = response.data.daily.weathercode[0];
        if (weatherRes === 0 || weatherRes === 1) {
          // 晴れ
          return setWeather(<WiDaySunny />);
        } else if (weatherRes === 2) {
          //   曇り
          return setWeather(<WiDaySunnyOvercast />);
        } else if (weatherRes === 3 || weatherRes === 45) {
          //   曇り
          return setWeather(<WiCloudy />);
        } else if (
          weatherRes === 61 ||
          weatherRes === 63 ||
          weatherRes === 80 ||
          weatherRes === 81
        ) {
          //   小雨
          return setWeather(<WiRainMix />);
        } else if (weatherRes === 65 || weatherRes === 82) {
          //   大雨
          return setWeather(<WiRain />);
        }
        // else {
        //   return setWeather(
        //     <p className=" text-sm">天気</p>
        //   );
        // }
        // setWeather(weatherRes);
        // // return weatherRes;

        // console.log(weatherRes);
      })
      .catch(function (error) {
        // リクエスト失敗時の処理（errorにエラー内容が入っている）
        console.log(error);
      })
      .finally(function () {
        // 成功失敗に関わらず必ず実行
        console.log("done!");
      });
  }, []);

  return <div className="text-white md:text-4xl text-3xl">{weather}</div>;
};

export default WeatherRef;
