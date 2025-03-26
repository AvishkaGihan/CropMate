import React, { useState, useEffect, useRef } from 'react';
import { format, startOfDay, endOfDay, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isAfter, isBefore, isEqual } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * DateRangePicker component for selecting date ranges with presets
 */
const DateRangePicker = ({
    startDate,
    endDate,
    onChange,
    presets = true,
    maxDate = new Date(),
    minDate = subDays(new Date(), 365),
    dateFormat = 'MMM dd, yyyy',
    placeholderText = 'Select date range',
    isClearable = true,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [month, setMonth] = useState(startDate || new Date());
    const [hoverDate, setHoverDate] = useState(null);
    const [localStartDate, setLocalStartDate] = useState(startDate);
    const [localEndDate, setLocalEndDate] = useState(endDate);
    const [selecting, setSelecting] = useState(!startDate);

    const containerRef = useRef(null);

    // Handle click outside to close the picker
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Update internal state when props change
    useEffect(() => {
        setLocalStartDate(startDate);
        setLocalEndDate(endDate);
        if (startDate && !endDate) {
            setSelecting(false);
        } else if (!startDate && !endDate) {
            setSelecting(true);
        }
    }, [startDate, endDate]);

    // Handle date click - either sets start or end date
    const handleDateClick = (date) => {
        if (selecting) {
            // First click - set start date
            setLocalStartDate(date);
            setLocalEndDate(null);
            setSelecting(false);
        } else {
            // Second click - set end date
            if (localStartDate && isBefore(date, localStartDate)) {
                // If clicked date is before start date, swap them
                setLocalEndDate(localStartDate);
                setLocalStartDate(date);
            } else {
                setLocalEndDate(date);
            }
            setSelecting(true);

            // If both dates are selected, trigger onChange and close
            if (localStartDate) {
                const newStart = startOfDay(date < localStartDate ? date : localStartDate);
                const newEnd = endOfDay(date < localStartDate ? localStartDate : date);
                onChange(newStart, newEnd);
                setTimeout(() => setIsOpen(false), 300);
            }
        }
    };

    // Handle preset date range selection
    const handlePresetClick = (preset) => {
        let newStartDate;
        let newEndDate;
        const today = new Date();

        switch (preset) {
            case 'today':
                newStartDate = startOfDay(today);
                newEndDate = endOfDay(today);
                break;
            case 'yesterday':
                const yesterday = subDays(today, 1);
                newStartDate = startOfDay(yesterday);
                newEndDate = endOfDay(yesterday);
                break;
            case 'last7Days':
                newStartDate = startOfDay(subDays(today, 6));
                newEndDate = endOfDay(today);
                break;
            case 'last30Days':
                newStartDate = startOfDay(subDays(today, 29));
                newEndDate = endOfDay(today);
                break;
            case 'thisWeek':
                newStartDate = startOfWeek(today, { weekStartsOn: 0 });
                newEndDate = endOfWeek(today, { weekStartsOn: 0 });
                break;
            case 'thisMonth':
                newStartDate = startOfMonth(today);
                newEndDate = endOfMonth(today);
                break;
            default:
                return;
        }

        setLocalStartDate(newStartDate);
        setLocalEndDate(newEndDate);
        onChange(newStartDate, newEndDate);
        setTimeout(() => setIsOpen(false), 300);
    };

    // Navigate to previous month
    const prevMonth = () => {
        setMonth((current) => {
            const newMonth = new Date(current);
            newMonth.setMonth(newMonth.getMonth() - 1);
            return newMonth;
        });
    };

    // Navigate to next month
    const nextMonth = () => {
        setMonth((current) => {
            const newMonth = new Date(current);
            newMonth.setMonth(newMonth.getMonth() + 1);
            return newMonth;
        });
    };

    // Clear the selected date range
    const handleClear = () => {
        setLocalStartDate(null);
        setLocalEndDate(null);
        setSelecting(true);
        onChange(null, null);
    };

    // Format the selected date range for display
    const formatSelectedRange = () => {
        if (!localStartDate) return placeholderText;

        const formattedStart = format(localStartDate, dateFormat);
        if (!localEndDate) return `${formattedStart} - ...`;

        const formattedEnd = format(localEndDate, dateFormat);
        return `${formattedStart} - ${formattedEnd}`;
    };

    // Check if a date is in the selected range
    const isInRange = (date) => {
        if (!localStartDate || !hoverDate) return false;

        const isSelecting = !localEndDate;
        const rangeStart = localStartDate;
        const rangeEnd = isSelecting ? hoverDate : localEndDate;

        return (
            (isAfter(date, rangeStart) || isEqual(date, rangeStart)) &&
            (isBefore(date, rangeEnd) || isEqual(date, rangeEnd))
        );
    };

    // Check if a date is disabled
    const isDisabled = (date) => {
        return (minDate && isBefore(date, minDate)) ||
            (maxDate && isAfter(date, maxDate));
    };

    // Generate dates for the current month view
    const getDates = () => {
        const year = month.getFullYear();
        const monthIdx = month.getMonth();
        const firstDayOfMonth = new Date(year, monthIdx, 1);
        const lastDayOfMonth = new Date(year, monthIdx + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();

        const days = [];

        // Get day of week for first day (0 = Sunday, 1 = Monday, etc.)
        const firstDayOfWeek = firstDayOfMonth.getDay();

        // Add empty slots for days from previous month
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(null);
        }

        // Add days of current month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, monthIdx, day));
        }

        return days;
    };

    return (
        <div className="relative" ref={containerRef}>
            {/* Input display */}
            <div
                className="flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 bg-white cursor-pointer hover:border-gray-400"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center">
                    <CalendarIcon size={16} className="text-gray-500 mr-2" />
                    <span className={`${!localStartDate ? 'text-gray-400' : 'text-gray-800'}`}>
                        {formatSelectedRange()}
                    </span>
                </div>
                {isClearable && localStartDate && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClear();
                        }}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Date picker dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 mt-1 bg-white shadow-lg rounded-lg border border-gray-200 p-3 w-auto min-w-[300px]"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Presets */}
                            {presets && (
                                <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-3 md:pb-0 md:pr-3">
                                    <h3 className="font-medium text-gray-700 text-sm mb-2">Presets</h3>
                                    <div className="space-y-1">
                                        <button
                                            type="button"
                                            onClick={() => handlePresetClick('today')}
                                            className="block w-full text-left py-1 px-2 text-sm rounded hover:bg-gray-100 text-gray-700"
                                        >
                                            Today
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handlePresetClick('yesterday')}
                                            className="block w-full text-left py-1 px-2 text-sm rounded hover:bg-gray-100 text-gray-700"
                                        >
                                            Yesterday
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handlePresetClick('last7Days')}
                                            className="block w-full text-left py-1 px-2 text-sm rounded hover:bg-gray-100 text-gray-700"
                                        >
                                            Last 7 Days
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handlePresetClick('last30Days')}
                                            className="block w-full text-left py-1 px-2 text-sm rounded hover:bg-gray-100 text-gray-700"
                                        >
                                            Last 30 Days
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handlePresetClick('thisWeek')}
                                            className="block w-full text-left py-1 px-2 text-sm rounded hover:bg-gray-100 text-gray-700"
                                        >
                                            This Week
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handlePresetClick('thisMonth')}
                                            className="block w-full text-left py-1 px-2 text-sm rounded hover:bg-gray-100 text-gray-700"
                                        >
                                            This Month
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Calendar */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <button
                                        type="button"
                                        onClick={prevMonth}
                                        className="p-1 rounded-full hover:bg-gray-100"
                                    >
                                        <ChevronLeft size={16} className="text-gray-600" />
                                    </button>
                                    <h3 className="font-medium text-gray-700">{format(month, 'MMMM yyyy')}</h3>
                                    <button
                                        type="button"
                                        onClick={nextMonth}
                                        className="p-1 rounded-full hover:bg-gray-100"
                                    >
                                        <ChevronRight size={16} className="text-gray-600" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-7 gap-1">
                                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                                        <div
                                            key={day}
                                            className="h-8 w-8 flex items-center justify-center text-xs font-medium text-gray-500"
                                        >
                                            {day}
                                        </div>
                                    ))}

                                    {getDates().map((date, i) => {
                                        if (!date) {
                                            return <div key={`empty-${i}`} className="h-8 w-8" />;
                                        }

                                        const isSelected =
                                            (localStartDate && isEqual(date, localStartDate)) ||
                                            (localEndDate && isEqual(date, localEndDate));

                                        const isRangeDay = isInRange(date);
                                        const isStart = localStartDate && isEqual(date, localStartDate);
                                        const isEnd = localEndDate && isEqual(date, localEndDate);
                                        const disabled = isDisabled(date);

                                        return (
                                            <button
                                                key={date.toString()}
                                                type="button"
                                                disabled={disabled}
                                                onClick={() => !disabled && handleDateClick(date)}
                                                onMouseEnter={() => setHoverDate(date)}
                                                className={`
                          h-8 w-8 flex items-center justify-center text-sm rounded-md
                          ${disabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}
                          ${isSelected ? 'bg-gray-700 text-white hover:bg-gray-800' : ''}
                          ${isRangeDay && !isSelected ? 'bg-gray-100' : ''}
                          ${isStart ? 'rounded-l-md' : ''}
                          ${isEnd ? 'rounded-r-md' : ''}
                        `}
                                            >
                                                {date.getDate()}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="mt-3 text-xs text-gray-500 text-center">
                                    {localStartDate && !selecting
                                        ? 'Select end date'
                                        : 'Select start date'}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DateRangePicker;