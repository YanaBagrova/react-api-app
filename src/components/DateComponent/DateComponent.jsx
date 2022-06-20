import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useTheme from '@mui/material/styles/useTheme';
import { MobileStepper, Button, Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { paramsAddAC } from '../../redux/actionCreators/paramsAC';
import { getCallsFetchAC } from '../../redux/actionCreators/callsAC';

function DateComponent(props) {
  const [dateFilter, setDateFilter] = useState('все')
  const [todayDate, setTodayDate] = useState('')
  const [dateThreeDaysAgo, setDateThreeDaysAgo] = useState('')
  const [dateWeekAgo, setDateWeekAgo] = useState('')
  const [dates, setDates] = useState('')
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [activeStepFirstTimeRegulator, setActiveStepFirstTimeRegulator] = useState(false)
  const steps = 3
  const dispatch = useDispatch()

  const drop = useSelector(state => state.dropReducer.drop)

  useEffect(() => {
    setActiveStep(0)
    setDateFilter('все')
    getCallsFetchAC('')
  }, [drop])

  useEffect(() => {
    function formatDate(date) {
      const curr_date = (date.getDate().toString().length === 1) ? `0${date.getDate()}` : date.getDate();;
      const curr_month = ((date.getMonth()).toString().length === 1) ? `0${date.getMonth() + 1}` : date.getMonth();
      const curr_year = date.getFullYear()
      const formatedDate = `${curr_year}-${curr_month}-${curr_date}`;
      return formatedDate
    }

    function getDate(arg) {
      const date = typeof arg === 'number' ? new Date(new Date().getTime() - 86400000 * arg) : new Date()
      const formatedDate = formatDate(date)
      return formatedDate
    }

    const datesArr = ['today', 3, 7]
    const dates = datesArr.map((el) => getDate(el))
    setTodayDate(dates[0])
    setDateThreeDaysAgo(dates[1])
    setDateWeekAgo(dates[2])
  }, [])

  useEffect(() => {
    const dates = [[dateThreeDaysAgo, '3 дня'], [dateWeekAgo, 'неделя']]
    setDates(dates)
  }, [dateThreeDaysAgo, dateWeekAgo])

  useEffect(() => {
    if (activeStep && activeStepFirstTimeRegulator) {
      function createDispatch(dateStart) {
        dispatch(paramsAddAC(`date_start=${dateStart}&date_end=${todayDate}`))
      }
      createDispatch(dates[activeStep - 1][0])
      setDateFilter(dates[activeStep - 1][1])
    } else if (!activeStep && activeStepFirstTimeRegulator) {

      dispatch(paramsAddAC(''))
      setDateFilter('все')
    }
  }, [activeStep, dates, dispatch, todayDate, activeStepFirstTimeRegulator])

  const handleNext = () => {
    if (activeStep === 0 && !activeStepFirstTimeRegulator) {
      setActiveStepFirstTimeRegulator(true)
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <MobileStepper
        sx={{
          width: '101.41px',
          marginLeft: '1558.76px',
          marginTop: '96px',
          bgcolor: 'transparent',
          color: 'transparent'
        }}
        variant="text"
        steps={steps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            // size="small"
            onClick={handleNext}
            disabled={activeStep === steps - 1}
            sx={{ color: 'rgba(173, 191, 223, 1)', '& .MuiSvgIcon-root': { width: '14px', height: '15px' } }}
          >
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </Button>
        }
        backButton={
          <Button
            // size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{ color: 'rgba(173, 191, 223, 1)', '& .MuiSvgIcon-root': { width: '14px', height: '15px' } }}
          >
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
            {/* {<CalendarTodayIcon
              sx={{
                color: 'rgba(173, 191, 223, 1)'
              }}
            />} */}
          </Button>
        }
      />
      <Box sx={{
        marginLeft: '83.7%', marginTop: '-2.35%', color: 'rgba(0, 95, 248, 1)', fontWeight: 900,
        fontFamily: 'SF Pro Display', fontWeight: 400, fontSize: '14px', lineHeight: '16px',
      }}>
        <CalendarTodayIcon sx={{ color: 'rgba(173, 191, 223, 1)', width: '16px', height: '18px' }}
        /><Box sx={{marginTop: '-20px', marginLeft: '20px'}}>{dateFilter}</Box></Box>
    </>
  );
}

export default DateComponent;
