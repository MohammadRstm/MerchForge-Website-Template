import { useEffect, useState } from "react";

interface CountdownTimerProps {
    style?: 1 | 2 | 3 | 4 | 5 | 6;
    targetDate?: string;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft | null {
    const difference = +new Date(targetDate) - +new Date();

    if (difference <= 0) {
        return null;
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}

// The source template's default was a fixed date, which is why every countdown
// badge showed "Time's up!" the moment that date passed. A rolling default — a
// fixed distance from whenever this actually renders — never goes stale, but it's
// still just a placeholder: pass a real per-product `targetDate` once products carry
// their own sale-end time.
const DEFAULT_COUNTDOWN_DAYS = 3;

function defaultTargetDate(): string {
    const target = new Date();
    target.setDate(target.getDate() + DEFAULT_COUNTDOWN_DAYS);
    return target.toISOString();
}

/** Product-card and popup countdown badge. `style` picks the label format. */
export default function CountdownTimer({ style = 1, targetDate }: CountdownTimerProps) {
    // Computed once per mount, not on every render, so the countdown doesn't reset
    // its own deadline every second as the interval below forces re-renders.
    const [resolvedTargetDate] = useState(() => targetDate ?? defaultTargetDate());
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => calculateTimeLeft(resolvedTargetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(resolvedTargetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [resolvedTargetDate]);

    if (!timeLeft) {
        return <div>Time's up!</div>;
    }

    const labels: Record<NonNullable<CountdownTimerProps["style"]>, [string, string, string, string]> = {
        1: ["D :", "H :", "M :", "S"],
        2: ["Days", "Hours", "Mins", "Secs"],
        3: ["DAYS", "HOURS", "MINUTES", "SECONDS"],
        4: ["", "", ":", ""],
        5: ["d :", "h :", "m :", "s"],
        6: ["D", "H", "M", "S"],
    };

    const [dLabel, hLabel, mLabel, sLabel] = labels[style];

    if (style === 4) {
        return (
            <div aria-hidden="true" className="countdown__timer">
                <span className="countdown__item">
                    <span className="countdown__value">{timeLeft.minutes}</span>
                    <span className="countdown__label">{mLabel}</span>
                </span>
                <span className="countdown__item">
                    <span className="countdown__value">{timeLeft.seconds}</span>
                    <span className="countdown__label">{sLabel}</span>
                </span>
            </div>
        );
    }

    return (
        <div aria-hidden="true" className="countdown__timer">
            <span className="countdown__item">
                <span className="countdown__value">{timeLeft.days}</span>
                <span className="countdown__label">{dLabel}</span>
            </span>
            <span className="countdown__item">
                <span className="countdown__value">{timeLeft.hours}</span>
                <span className="countdown__label">{hLabel}</span>
            </span>
            <span className="countdown__item">
                <span className="countdown__value">{timeLeft.minutes}</span>
                <span className="countdown__label">{mLabel}</span>
            </span>
            <span className="countdown__item">
                <span className="countdown__value">{timeLeft.seconds}</span>
                <span className="countdown__label">{sLabel}</span>
            </span>
        </div>
    );
}
