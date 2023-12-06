import { getGreeting } from "./getCurrentPartOfTheDay";

describe('greeting function', () => {
    it('should return the correct greeting for Good Morning', () => {
        const date = new Date('2023-12-06T09:00:00').getHours();
        const greeting = getGreeting({ currentHour: date });
        expect(greeting).toBe('Good Morning');
    });

    it('should return the correct greeting for Good Afternoon', () => {
        const date = new Date('2023-12-06T18:59:59').getHours();
        const greeting = getGreeting({ currentHour: date });
        expect(greeting).toBe('Good Afternoon');
    });

    it('should return the correct greeting for Good Evening', () => {
        const date = new Date('2023-12-06T19:00:00').getHours();
        const greeting = getGreeting({ currentHour: date });
        expect(greeting).toBe('Good Evening');
    });
});
