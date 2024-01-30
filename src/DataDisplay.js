import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import PlayerDisplay from './components/PlayerDisplay';
import { Player } from './lib/objects/Classes';
import Papa from 'papaparse';
import { useTrail, animated } from 'react-spring';


function DataDisplay() {
   const sortOptions = [
        { value: 'Goals', label: 'Goals' },
        { value: 'Assists', label: 'Assists' },
        { value: 'Appearances', label: 'Appearances' },
    ];
  const [squadData, setSquadData] = useState([]);
  const [fanData, setFanData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // modalVisbile means we are in list view
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);

  const [trail, setTrail] = useTrail(squadData?.length || 0, index => ({
    transform: 'translateX(0%)',
    opacity: 1,
    delay: index * 100, // Adjust the multiplier to control the delay duration between items
    from: { transform: 'translateX(-100%)', opacity: 0 },
  }));
  const toggleModal = () => {
    setIsModalVisible(prevState => {
        if (!prevState) { // If we're about to show in list view
            const sortedSquadData = [...squadData].sort((a, b) => b[selectedOption.value] - a[selectedOption.value]);
            setSquadData(sortedSquadData);
        } else {
            const sortedSquadData = [...squadData].sort((a, b) => b.PlayerNumber - a.PlayerNumber);
            setSquadData(sortedSquadData);
        }

        return !prevState;
      });
  };
  useEffect(() => {
        if (squadData === null) return;
        const sortedSquadData = [...squadData].sort((a, b) => b[selectedOption.value] - a[selectedOption.value]);
        setSquadData(sortedSquadData);
    }, [selectedOption]);  

  useEffect(() => {
    const squadURL = "https://docs.google.com/spreadsheets/d/1x6YQo3FwHJOeLdMk9Annqn1vWdacNyhVrZ2Lj2oygzQ/export?format=csv&id=1x6YQo3FwHJOeLdMk9Annqn1vWdacNyhVrZ2Lj2oygzQ&gid=0";
    const fanURL = "https://docs.google.com/spreadsheets/d/1x6YQo3FwHJOeLdMk9Annqn1vWdacNyhVrZ2Lj2oygzQ/export?format=csv&id=1x6YQo3FwHJOeLdMk9Annqn1vWdacNyhVrZ2Lj2oygzQ&gid=1982940403";
    

        axios.get(squadURL)
            .then(response => {
                const csvData = response.data;

                Papa.parse(csvData, {
                    header: true,
                    complete: (result) => {
                        console.log("Squad data loaded");
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
  useEffect(() => {
    if (isModalVisible) {
        // Animate the expansion and translation from the left when modal (list view) is visible
        setTrail(index => ({
            reset: true,
            to: {
              transform: 'translateX(0%)',
              opacity: 1,
              width: '100%',
            },
            from: {
              transform: 'translateX(-100%)',
              opacity: 0,
              width: '0%', // Adjust this based on your needs
            },
            
            // delay: index * 100, // Applying staggered delay
          }));
        } else {
            setTrail({
                to: {
                    transform: 'translateX(0%)',
                    opacity: 1,
                },
                from: {
                    transform: 'translateX(-20%)', 
                    opacity: 0, 
                }
            });
        }
    }, [isModalVisible]);

    
    

    


  return (
    <>

    <div className="games p-2">
        <h1 className="title">Next Game</h1>
        <p>Trauma FC, 25th, Pitch 1</p>
    </div>


    <div className="squad">
        <div className="d-flex justify-content-between p-2 align-items-center">
            <h1 className="title">Squad</h1>
            <i className="bi bi-sort-numeric-down title" onClick={toggleModal}></i>
        </div>
        {isModalVisible ? 
        <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={sortOptions}
        /> 
        : 
        <></>
      }
        <div className={`d-flex ${isModalVisible ? 'flex-column' : 'flex-wrap justify-content-around'}`}>
            {squadData && trail.map((props, index) => (
            <animated.div className={`d-flex ${isModalVisible ? '' : 'w-auto'}`}  key={index} style={props}>
                <PlayerDisplay
                    id={squadData[index].PlayerID}
                    name={squadData[index].PlayerName}
                    number={squadData[index].PlayerNumber}
                    bitmoji="" 
                    goals={squadData[index].Goals}
                    assists={squadData[index].Assists}
                    mom={squadData[index].MOM}
                    apps={squadData[index].Appearances}
                    showBanner={isModalVisible}
                />
            </animated.div>
            ))}
        </div>
    </div> 

    <div className="fans">
        <h1 className="px-2 title">Fans</h1>
        <div className="d-flex flex-wrap justify-content-between">
            {fanData && fanData.map((item, index) => (
                <div key={index}>
                    <PlayerDisplay
                        id={item.FanID}
                        name={item.FanName}
                        number={item.FanNumber}
                        bitmoji="" 
                        goals={0} 
                        assists={0} 
                        mom={0} 
                        apps={0} 
                        showBanner={isModalVisible}
                    />

                </div>
            ))}
        </div>
    </div>
    
    </>
    
  );
}

export default DataDisplay;
