import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import Accordion from '@mui/material/Accordion';
import RemoveIcon from '@mui/icons-material/Remove';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useSelector } from 'react-redux';
import useColor from '../../../../../utils/hooks/useColor';

const data = [
  {
    title:
      'I can not seem to find to connect my profile with my personal account?',
    description:
      'Free version contains a limited amount of pre-designed blocks in comparison to the Pro version with more than 100 blocks.',
  },
  {
    title: 'I have lost my listing. Where can I can get it back?',
    description:
      'Free version contains a limited amount of pre-designed blocks in comparison to the Pro version with more than 100 blocks.',
  },
  {
    title: 'I want to remove a listing. How to do that?',
    description:
      'Free version contains a limited amount of pre-designed blocks in comparison to the Pro version with more than 100 blocks.',
  },
  {
    title: 'I cannot duplicate my account on this platform.',
    description:
      'Free version contains a limited amount of pre-designed blocks in comparison to the Pro version with more than 100 blocks.',
  },
];

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 15,
  },
  title: {
    fontSize: 17,
    fontFamily: 'light',
    color: '#1B1D21',
  },
  description: {
    fontSize: 14,
    fontFamily: 'light',
    color: '#1B1D21',
  },
}));

const AccountSupportAccordian = () => {
  const classes = useStyles();
  const [active, setActive] = useState(null);
  const [toggle, setToggle] = useState(false);
  const { colors, darkMode } = useSelector((state) => state.global);
  useColor(colors);

  return (
    <div className={classes.container}>
      {data.map((value, index) => (
        <Accordion
          key={index}
          onClick={() => {
            setActive(index);
            setToggle(!toggle);
          }}
          sx={{
            width: '100%',
            padding: '10px 0',
            margin: '10px 0',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            //backgroundColor: active === index && '#134696',
            backgroundColor:
              active === index && darkMode
                ? colors?.primary
                : active === index && !darkMode
                ? '#134696'
                : '',
          }}
        >
          <AccordionSummary
            expandIcon={
              toggle ? (
                <RemoveIcon
                  sx={{
                    color: '#ffffff',
                  }}
                />
              ) : (
                <AddIcon
                  sx={{
                    color: active === index ? '#ffffff' : '#000000',
                  }}
                />
              )
            }
          >
            <div
              className={classes.title}
              style={{ color: active === index && '#ffffff' }}
            >
              {value.title}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className={classes.description}
              style={{ color: active === index && '#ffffff' }}
            >
              {value.description}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default AccountSupportAccordian;
