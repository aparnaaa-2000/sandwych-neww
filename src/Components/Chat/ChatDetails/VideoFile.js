import React, { useState, useRef } from 'react';
import { StyleSheet,View } from 'react-native';

//IMPORT THIRD-PARTY PACKAGE
import Video from 'react-native-video';
import
MediaControls, { PLAYER_STATES }
    from 'react-native-media-controls';

//IMPORT CONSTANTS
import { PUREBLACK } from '../../../Constants/Colors/Colors';
import { GlobalSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

const VideoFile = ({ route }) => {
    
    const videoPlayer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [
        playerState, setPlayerState
    ] = useState(PLAYER_STATES.PLAYING);


    const onSeek = (seek) => {
        //Handler for change in seekbar
        videoPlayer.current.seek(seek);
    };

    const onPaused = (playerState) => {
        //Handler for Video Pause
        setPaused(!paused);
        setPlayerState(playerState);
    };

    const onReplay = () => {
        //Handler for Replay
        setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer.current.seek(0);
    };

    const onProgress = (data) => {
        // Video Player will progress continue even if it ends
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoad = (data) => {
        setDuration(data.duration);
        setIsLoading(false);
    };

    const onLoadStart = (data) => setIsLoading(true);

    const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);


    const onSeeking = (currentTime) => setCurrentTime(currentTime);

    return (
        <>
            <View style={styles.container}>
                <Video
                    onEnd={onEnd}
                    onLoad={onLoad}
                    onLoadStart={onLoadStart}
                    onProgress={onProgress}
                    paused={paused}
                    ref={videoPlayer}
                    resizeMode={'contain'}
                    onFullScreen={isFullScreen}
                    source={{
                        uri:
                            route.params.VideoPath,
                    }}
                    style={styles.mediaPlayer}
                />
                <MediaControls
                    duration={duration}
                    isLoading={isLoading}
                    mainColor="#333"
                    onPaused={onPaused}
                    onReplay={onReplay}
                    onSeek={onSeek}
                    onSeeking={onSeeking}
                    playerState={playerState}
                    progress={currentTime}
                />
            </View>
        </>
    );
};

export default VideoFile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:PUREBLACK
    },

    mediaPlayer: {
        width: GlobalSize(300),
        height: GlobalSize(500),
        flex: 1,
        alignItems: 'center',
        backgroundColor:PUREBLACK,
        justifyContent: 'center',
    },
});


