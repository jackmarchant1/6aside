import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerDisplay from './components/PlayerDisplay';
import { Player } from './lib/objects/Classes';
import Papa from 'papaparse';


function DataDisplay() {
  const [squadData, setSquadData] = useState();
  const [fanData, setFanData] = useState();

  useEffect(() => {
    const squadURL = "https://docs.google.com/spreadsheets/d/1x6YQo3FwHJOeLdMk9Annqn1vWdacNyhVrZ2Lj2oygzQ/export?format=csv&id=1x6YQo3FwHJOeLdMk9Annqn1vWdacNyhVrZ2Lj2oygzQ&gid=0";
    const fanURL = "https://docs.google.com/spreadsheets/d/1x6YQo3FwHJOeLdMk9Annqn1vWdacNyhVrZ2Lj2oygzQ/export?format=csv&id=1x6YQo3FwHJOeLdMk9Annqn1vWdacNyhVrZ2Lj2oygzQ&gid=1982940403";
    

        axios.get(squadURL)
            .then(response => {
                const csvData = response.data;

                Papa.parse(csvData, {
                    header: true,
                    complete: (result) => {
                        setSquadData(result.data);
                    }
                });
            })
            .catch(error => {
                console.error("There was an error fetching the data", error);
            });

            axios.get(fanURL)
            .then(response => {
                const csvData = response.data;

                Papa.parse(csvData, {
                    header: true,
                    complete: (result) => {
                        setFanData(result.data);
                    }
                });
            })
            .catch(error => {
                console.error("There was an error fetching the data", error);
            });

  }, []);

  return (
    <>

    <div className="games p-2">
        <h1 className="title">Next Game</h1>
        <p>Trauma FC, 25th, Pitch 1</p>
    </div>

    <div className="squad">
        <div className="d-flex justify-content-between p-2 align-items-center">
            <h1 clasName="title">Squad</h1>
            <i className="bi bi-sort-numeric-down title"></i>
        </div>
        
        <div className="d-flex flex-wrap justify-content-around">
            {squadData && squadData.map((item, index) => (
                <div key={index}>
                    {/* Render your data here */}
                    <PlayerDisplay {...new Player(item.PlayerID, item.PlayerName, item.PlayerNumber, "")} />
                </div>
            ))}
        </div>
    </div>

    <div className="fans">
        <h1 className="px-2 title">Fans</h1>
        <div className="d-flex flex-wrap justify-content-around">
            {fanData && fanData.map((item, index) => (
                <div key={index}>
                    {/* Render your data here */}
                    <PlayerDisplay {...new Player(item.FanID, item.FanName, item.FanNumber, "")} />
                </div>
            ))}
        </div>
    </div>
    
    </>
    
  );
}

export default DataDisplay;
