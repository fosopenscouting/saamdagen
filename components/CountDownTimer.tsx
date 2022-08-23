import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { View, Text } from './Themed';
import ContentCard from '../components/ContentCard';
import { StyleSheet } from 'react-native';

type CounterProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
const ShowCounter = (props: CounterProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
      }}
    >
      <DateTimeDisplay value={props.days} type={'DAGEN'} />
      <DateTimeDisplay value={props.hours} type={'UREN'} />
      <DateTimeDisplay value={props.minutes} type={'MIN'} />
      <DateTimeDisplay value={props.seconds} type={'SEC'} />
    </View>
  );
};

type CountdownTimerProps = {
  targetDate: Date;
};
const CountdownTimer = (props: CountdownTimerProps): JSX.Element => {
  const [days, hours, minutes, seconds] = useCountdown(props.targetDate);

  if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0)
    return <View></View>;
  else
    return (
      <ContentCard
        containerStyle={[styles.countdown, { marginTop: 8 }]}
        colorOverlay
        palette="fosBlue"
        backgroundImage={require('../assets/images/banner.jpg')}
      >
        <Text style={styles.countdownTitle}>SAAMDAGEEEN</Text>
        <ShowCounter
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      </ContentCard>
    );
};

type DateTimeDisplayProps = {
  value: number;
  type: string;
};
const DateTimeDisplay = (props: DateTimeDisplayProps) => {
  return (
    <View style={{ backgroundColor: 'transparent' }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 30,
          color: 'white',
          fontFamily: 'Quicksand_600SemiBold',
        }}
      >
        {props.value}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 19,
          color: 'white',
          fontFamily: 'Quicksand_600SemiBold',
        }}
      >
        {props.type}
      </Text>
    </View>
  );
};

export default CountdownTimer;

const styles = StyleSheet.create({
  countdown: {
    marginHorizontal: 8,
    marginTop: 8,
  },
  countdownTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
