import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Animated,
    SafeAreaView,
    NativeSyntheticEvent,
    NativeScrollEvent,
    StatusBar, // For status bar styling
    Image
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Global Colors for a Kid-Friendly Theme
const COLORS = {
    primary: '#7B68EE', 
    secondary: '#FFD700', 
    background: '#F8F8FF',
    cardBackground: '#FFFFFF', 
    text: '#4682B4', 
    subtleText: '#87CEEB', 
    buttonText: '#FFFFFF',
    buttonPrimary: '#090205ff', 
    indicatorInactive: '#D3D3D3', 
};

interface OnboardingSlide {
    id: string;
    imageSource: any;
    title: string;
    description: string;
}

const slides: OnboardingSlide[] = [
    {
        id: '1',
        imageSource: require('./assets/onboarding/welcome.png'),
        title: 'Welcome to Your Learning!',
        description: 'Get ready to explore and have tons of learnings with our exciting lessons and activities!',
    },
    {
        id: '2',
        imageSource: require('./assets/onboarding/unlock.png'),
        title: 'Unlock New Knowledge',
        description: 'Dive into amazing subjects, discover new things, and grow smarter every day!',
    },
    {
        id: '3',
        imageSource: require('./assets/onboarding/rewards.png'),
        title: 'Earn Awesome Rewards',
        description: 'Track your progress, achieve goals, and collect cool badges for your hard work!',
    },
    {
        id: '4',
       imageSource: require('./assets/onboarding/journey.png'),
        title: 'Your Journey Starts Now!',
        description: 'We are super excited to see you shine! Let\'s begin your learning adventure!',
    },
];

interface NavigationProps {
    navigation: NavigationProp<any>;
}
const OnboardingScreen: React.FC<NavigationProps> = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList<OnboardingSlide> | null>(null);

    // This function updates the currentIndex state when the viewable items in FlatList change.
    // This is essential for controlling the active state of the pagination dots.
    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index || 0);
        }
    }).current;

    // Configuration for viewability. It means an item is considered viewable if 50% of its area is visible.
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    // Handles moving to the next slide or finishing onboarding
    const scrollToNext = () => {
        if (currentIndex < slides.length - 1) {
            // Scroll to the next slide
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
        } else {
            // Logic for when onboarding is finished (e.g., navigate to the main app)
            console.log('Finished onboarding! Navigate to main app.');
            navigation.navigate("Login")
            // Example: navigation.replace('HomeStack'); // If using React Navigation
        }
    };

    // Handles skipping the onboarding process
    const skipOnboarding = () => {
        // Logic for skipping onboarding (e.g., navigate to the main app)
        console.log('Skipped onboarding! Navigate to main app.');
        // Example: navigation.replace('HomeStack'); // If using React Navigation
    };

    // Renders the pagination dots at the bottom
    const renderPagination = () => {
        return (
            <View style={styles.paginationContainer}>
                {slides.map((_, index) => {
                    // Define input range for interpolation based on scroll position
                    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

                    // Animate dot width: active dot is wider, inactive are thinner
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [10, 20, 10], // Widths for inactive, active, and next inactive
                        extrapolate: 'clamp', // Prevents values from going beyond the output range
                    });

                    // Animate dot opacity: active dot is fully opaque, inactive are semi-transparent
                    const dotOpacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.5, 1, 0.5], // Opacities for inactive, active, and next inactive
                        extrapolate: 'clamp',
                    });

                    // Animate dot color: active dot has primary color, inactive are light gray
                    const dotColor = scrollX.interpolate({
                        inputRange,
                        outputRange: [COLORS.indicatorInactive, COLORS.primary, COLORS.indicatorInactive],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={index.toString()} // Unique key for each dot
                            style={[
                                styles.dot,
                                { width: dotWidth, opacity: dotOpacity, backgroundColor: dotColor },
                            ]}
                        />
                    );
                })}
            </View>
        );
    };

    // Renders a single slide item
    const renderSlide = ({ item }: { item: OnboardingSlide }) => (
        <View style={styles.slide}>
            <Image source={item.imageSource} style={styles.slideImage} />
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideDescription}>{item.description}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* FlatList for horizontal scrolling of onboarding slides */}
            <FlatList
                data={slides}
                renderItem={renderSlide}
                horizontal
                pagingEnabled // Snaps to full page width
                showsHorizontalScrollIndicator={false}
                // Event listener for scroll position, mapped to scrollX Animated.Value
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false } // Required when interpolating non-transform properties like width/color
                )}
                onViewableItemsChanged={viewableItemsChanged} // Updates currentIndex
                viewabilityConfig={viewConfig}
                scrollEventThrottle={32} // Improves scroll event responsiveness
                ref={flatListRef} // Reference to FlatList for programmatic scrolling
            />

            {/* Pagination dots */}
            {renderPagination()}

            {/* Navigation buttons */}
            <View style={styles.buttonContainer}>
                {currentIndex < slides.length - 1 ? (
                    // Show Skip and Next buttons for intermediate slides
                    <>
                        <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
                            <Text style={styles.skipButtonText}>Skip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nextButton} onPress={scrollToNext}>
                            <Text style={styles.nextButtonText}>Next</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    // Show Get Started button on the last slide
                    <TouchableOpacity style={styles.getStartedButton} onPress={scrollToNext}>
                        <Text style={styles.getStartedButtonText}>Get Started!</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background, // Using global background color
    },
    slide: {
        width, // Each slide takes the full width of the screen
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: height * 0.1, // Add some top padding to lower content slightly
    },
    slideImage: {
        width: 250,  
        height: 250, 
        resizeMode: 'contain', 
        marginBottom: 30,
    },
    slideTitle: {
        fontSize: 34, // Large, bold title
        fontWeight: 'bold',
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: 15,
    },
    slideDescription: {
        fontSize: 18,
        color: COLORS.subtleText,
        textAlign: 'center',
        lineHeight: 26,
        paddingHorizontal: 10,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginBottom: 20, // Spacing from buttons
    },
    dot: {
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 70, // More bottom padding for visual comfort
        position: 'absolute', // Position buttons at the bottom
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
    },
    skipButton: {
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 30,
        backgroundColor: COLORS.indicatorInactive,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    skipButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text,
    },
    nextButton: {
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary, // Shadow matching button color
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    nextButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.buttonText,
    },
    getStartedButton: {
        flex: 1,
        paddingVertical: 18, // Taller button
        borderRadius: 30,
        backgroundColor: COLORS.buttonPrimary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.buttonPrimary, // Shadow matching button color
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4, // Stronger shadow for main CTA
        shadowRadius: 12,
        elevation: 6,
    },
    getStartedButtonText: {
        fontSize: 22, // Larger text for main CTA
        fontWeight: 'bold',
        color: COLORS.buttonText,
    },
});

export default OnboardingScreen;