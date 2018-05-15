import * as Emitter from '../src/emitter';

describe('emitter', () => {
    // Testing event names
    const EVENT_NAME_ONE = 'event_name_one';
    const EVENT_NAME_ONE_UPPERCASE = 'event_name_ONE';
    const EVENT_NAME_TWO = 'event_name_two';
    const EVENT_NAME_THREE = 'event_name_three';

    // Testing event arguments
    const ARGUMENT_ONE = 'arg1';
    const ARGUMENT_TWO = 'arg2';

    // Testing subscription functions
    let spyFunction;
    let spyFunction3;
    let spyFunction2;

    /**
     * Check if an error is thrown if the first argument is not a string data type
     *
     * @param {Function} fn Emitter function
     * @returns {void}
     */
    function expectErrorThrownOnInvalidStringArgument(fn) {
        [
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
            {
                foo: 'bar',
            },
            true,
            false,
            spyFunction,
            1234567890,
            null,
            undefined,
        ].forEach((invalidEvent) => {
            expect(() => {
                fn(invalidEvent, spyFunction);
            }).toThrowError();
        });
    }

    /**
     * Check if an error is thrown if the second argument is not a function data type
     *
     * @param {Function} fn Emitter function
     * @returns {void}
     */
    function expectErrorThrownOnInvalidFunctionArgument(fn) {
        [
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
            {
                foo: 'bar',
            },
            true,
            false,
            1234567890,
            EVENT_NAME_TWO,
            null,
            undefined,
        ].forEach((invalidFunction) => {
            expect(() => {
                fn(EVENT_NAME_ONE, invalidFunction);
            }).toThrowError();
        });
    }

    beforeEach(() => {
        spyFunction = jasmine.createSpy('EMPTY_FUNCTION_ONE');
        spyFunction2 = jasmine.createSpy('EMPTY_FUNCTION_TWO');
        spyFunction3 = jasmine.createSpy('EMPTY_FUNCTION_THREE');

        Emitter.off(EVENT_NAME_ONE);
        Emitter.off(EVENT_NAME_ONE_UPPERCASE);
        Emitter.off(EVENT_NAME_TWO);
        Emitter.off(EVENT_NAME_THREE);
    });

    describe('#off', () => {
        it('should unsubscribe an event name and the function', () => {
            Emitter.on(EVENT_NAME_ONE, spyFunction);
            Emitter.on(EVENT_NAME_TWO, spyFunction);
            Emitter.trigger(EVENT_NAME_ONE);
            Emitter.trigger(EVENT_NAME_TWO);

            expect(spyFunction.calls.count()).toBe(2);

            Emitter.off(EVENT_NAME_ONE, spyFunction);
            Emitter.trigger(EVENT_NAME_ONE);
            Emitter.trigger(EVENT_NAME_TWO);

            expect(spyFunction.calls.count()).toBe(3);
        });

        it('should unsubscribe an event name and an optional function if not triggered', () => {
            Emitter.on(EVENT_NAME_ONE, spyFunction);
            Emitter.on(EVENT_NAME_TWO, spyFunction2);
            Emitter.once(EVENT_NAME_THREE, spyFunction3);

            Emitter.off(EVENT_NAME_ONE, spyFunction);
            Emitter.off(EVENT_NAME_TWO);
            Emitter.off(EVENT_NAME_THREE, spyFunction3);

            Emitter.trigger(EVENT_NAME_ONE);
            Emitter.trigger(EVENT_NAME_TWO);
            Emitter.trigger(EVENT_NAME_THREE);

            expect(spyFunction.calls.count()).toBe(0);
            expect(spyFunction2.calls.count()).toBe(0);
            expect(spyFunction3.calls.count()).toBe(0);
        });

        it('should unsubscribe an event name and the function, only when multiple functions are subscribed', () => {
            Emitter.on(EVENT_NAME_ONE, spyFunction);
            Emitter.on(EVENT_NAME_ONE, spyFunction2);
            Emitter.on(EVENT_NAME_TWO, spyFunction);
            Emitter.trigger(EVENT_NAME_ONE);
            Emitter.trigger(EVENT_NAME_TWO);

            expect(spyFunction.calls.count()).toBe(2);
            expect(spyFunction2.calls.count()).toBe(1);

            Emitter.off(EVENT_NAME_ONE, spyFunction);
            Emitter.trigger(EVENT_NAME_ONE);
            Emitter.trigger(EVENT_NAME_TWO);

            expect(spyFunction.calls.count()).toBe(3);
            expect(spyFunction2.calls.count()).toBe(2);
        });

        it('should unsubscribe all functions when no function is provided', () => {
            Emitter.on(EVENT_NAME_ONE, spyFunction);
            Emitter.on(EVENT_NAME_ONE, spyFunction);
            Emitter.trigger(EVENT_NAME_ONE);

            expect(spyFunction.calls.count()).toBe(2);

            Emitter.off(EVENT_NAME_ONE);
            Emitter.trigger(EVENT_NAME_ONE);

            expect(spyFunction.calls.count()).toBe(2);
        });

        it('should return the total number of subscribers for the event name', () => {
            Emitter.on(EVENT_NAME_ONE, spyFunction);
            Emitter.on(EVENT_NAME_ONE, spyFunction);
            Emitter.on(EVENT_NAME_ONE, spyFunction2);

            expect(Emitter.off(EVENT_NAME_ONE, spyFunction)).toBe(1);
            expect(Emitter.off(EVENT_NAME_ONE)).toBe(0);
        });

        it('should throw an error if a non-string data type is passed as the first argument', () => {
            expectErrorThrownOnInvalidStringArgument(Emitter.off);
        });

        it('should throw an error if a non-function data type is passed as the second argument (includes undefined being passed)', () => {
            expectErrorThrownOnInvalidFunctionArgument(Emitter.off);
        });
    });

    describe('#on', () => {
        it('should subscribe to an event name and be called when triggered', () => {
            Emitter.on(EVENT_NAME_ONE, spyFunction);
            Emitter.trigger(EVENT_NAME_ONE);

            expect(spyFunction.calls.count()).toBe(1);
        });

        it('should subscribe to an event name and be called with the arguments that are triggered with', () => {
            Emitter.on(EVENT_NAME_ONE, spyFunction);
            Emitter.trigger(EVENT_NAME_ONE, ARGUMENT_ONE, ARGUMENT_TWO);

            expect(spyFunction.calls.argsFor(0).length).toBe(2);
            expect(spyFunction.calls.argsFor(0)).toEqual([ARGUMENT_ONE, ARGUMENT_TWO]);
        });

        it('should subscribe to an event name and be called with no arguments when triggered with none', () => {
            Emitter.on(EVENT_NAME_ONE, spyFunction);
            Emitter.trigger(EVENT_NAME_ONE);

            expect(spyFunction.calls.argsFor(0).length).toBe(0);
            expect(spyFunction.calls.argsFor(0)).toEqual([]);
        });

        it('should match event names exactly as they are entered i.e. case-sensitive', () => {
            Emitter.on(EVENT_NAME_ONE, spyFunction);
            Emitter.trigger(EVENT_NAME_ONE);
            Emitter.trigger(EVENT_NAME_ONE_UPPERCASE);
            Emitter.trigger(EVENT_NAME_ONE);

            expect(spyFunction.calls.count()).toBe(2);
        });

        it('should call all subscribed functions for the triggered event name', () => {
            Emitter.on(EVENT_NAME_ONE, spyFunction);
            Emitter.on(EVENT_NAME_ONE, spyFunction2);
            Emitter.on(EVENT_NAME_TWO, spyFunction3);

            Emitter.trigger(EVENT_NAME_ONE);

            expect(spyFunction.calls.count()).toBe(1);
            expect(spyFunction2.calls.count()).toBe(1);
            expect(spyFunction3.calls.count()).toBe(0);
        });

        it('should return the total number of subscribers for the event name', () => {
            expect(Emitter.on(EVENT_NAME_ONE, spyFunction)).toBe(1);
            expect(Emitter.on(EVENT_NAME_ONE, spyFunction)).toBe(2);
            expect(Emitter.on(EVENT_NAME_TWO, spyFunction)).toBe(1);
            expect(Emitter.on(EVENT_NAME_ONE_UPPERCASE, spyFunction)).toBe(1);
            expect(Emitter.on(EVENT_NAME_ONE, spyFunction)).toBe(3);
            expect(Emitter.on(EVENT_NAME_ONE_UPPERCASE, spyFunction)).toBe(2);
        });

        it('should throw an error if a non-string data type is passed as the first argument', () => {
            expectErrorThrownOnInvalidStringArgument(Emitter.on);
        });

        it('should throw an error if a non-function data type is passed as the second argument', () => {
            expectErrorThrownOnInvalidFunctionArgument(Emitter.on);
        });
    });

    describe('#once', () => {
        it('should subscribe to an event name and be called when triggered', () => {
            Emitter.once(EVENT_NAME_ONE, spyFunction);
            Emitter.trigger(EVENT_NAME_ONE);

            expect(spyFunction.calls.count()).toBe(1);
        });

        it('should subscribe to an event name and be called with the arguments that are triggered with', () => {
            Emitter.once(EVENT_NAME_ONE, spyFunction);
            Emitter.trigger(EVENT_NAME_ONE, ARGUMENT_ONE, ARGUMENT_TWO);

            expect(spyFunction.calls.argsFor(0).length).toBe(2);
            expect(spyFunction.calls.argsFor(0)).toEqual([ARGUMENT_ONE, ARGUMENT_TWO]);
        });

        it('should subscribe to an event name and be called "once" when triggered', () => {
            Emitter.once(EVENT_NAME_ONE, spyFunction);
            Emitter.trigger(EVENT_NAME_ONE);

            expect(spyFunction.calls.count()).toBe(1);

            Emitter.trigger(EVENT_NAME_ONE);
            expect(spyFunction.calls.count()).toBe(1);
        });

        it('should subscribe to an event name and be called with no arguments when triggered with none', () => {
            Emitter.once(EVENT_NAME_ONE, spyFunction);
            Emitter.trigger(EVENT_NAME_ONE);

            expect(spyFunction.calls.argsFor(0).length).toBe(0);
            expect(spyFunction.calls.argsFor(0)).toEqual([]);
        });

        it('should match event names exactly as they are entered i.e. case-sensitive', () => {
            Emitter.once(EVENT_NAME_ONE, spyFunction);
            Emitter.trigger(EVENT_NAME_ONE_UPPERCASE);

            expect(spyFunction.calls.count()).toBe(0);
        });

        it('should call all subscribed functions for the triggered event name', () => {
            Emitter.once(EVENT_NAME_ONE, spyFunction);
            Emitter.once(EVENT_NAME_ONE, spyFunction2);
            Emitter.once(EVENT_NAME_TWO, spyFunction3);

            Emitter.trigger(EVENT_NAME_ONE);

            expect(spyFunction.calls.count()).toBe(1);
            expect(spyFunction2.calls.count()).toBe(1);
            expect(spyFunction3.calls.count()).toBe(0);
        });

        it('should return the total number of subscribers for the event name', () => {
            expect(Emitter.once(EVENT_NAME_ONE, spyFunction)).toBe(1);
            expect(Emitter.once(EVENT_NAME_ONE, spyFunction)).toBe(2);
            expect(Emitter.once(EVENT_NAME_TWO, spyFunction)).toBe(1);
            expect(Emitter.once(EVENT_NAME_ONE_UPPERCASE, spyFunction)).toBe(1);
            expect(Emitter.once(EVENT_NAME_ONE, spyFunction)).toBe(3);
            expect(Emitter.once(EVENT_NAME_ONE_UPPERCASE, spyFunction)).toBe(2);
        });

        it('should throw an error if a non-string data type is passed as the first argument', () => {
            expectErrorThrownOnInvalidStringArgument(Emitter.once);
        });

        it('should throw an error if a non-function data type is passed as the second argument', () => {
            expectErrorThrownOnInvalidFunctionArgument(Emitter.once);
        });
    });

    describe('#trigger', () => {
        it('should call all subscribed functions for the triggered event name', () => {
            Emitter.on(EVENT_NAME_ONE, spyFunction);
            Emitter.on(EVENT_NAME_ONE, spyFunction);
            Emitter.on(EVENT_NAME_TWO, spyFunction);
            Emitter.trigger(EVENT_NAME_ONE);
            Emitter.trigger(EVENT_NAME_TWO);

            expect(spyFunction.calls.count()).toBe(3);
        });

        it('should call all subscribed functions for the triggered event name with multiple arguments', () => {
            Emitter.on(EVENT_NAME_ONE, spyFunction);
            Emitter.trigger(EVENT_NAME_ONE, ARGUMENT_ONE, ARGUMENT_TWO);

            expect(spyFunction.calls.argsFor(0).length).toBe(2);
            expect(spyFunction.calls.argsFor(0)).toEqual([ARGUMENT_ONE, ARGUMENT_TWO]);

            const arr = [1, 2, 3, 4];
            const obj = {
                foo: 'bar',
            };

            Emitter.trigger(EVENT_NAME_ONE, arr, obj, ARGUMENT_ONE);

            expect(spyFunction.calls.argsFor(1).length).toBe(3);
            expect(spyFunction.calls.argsFor(1)).toEqual([arr, obj, ARGUMENT_ONE]);
        });

        it('should return if the event name has subscribed functions', () => {
            Emitter.on(EVENT_NAME_ONE, spyFunction);

            expect(Emitter.trigger(EVENT_NAME_ONE)).toBe(true);
            expect(Emitter.trigger(EVENT_NAME_TWO)).toBe(false);

            Emitter.off(EVENT_NAME_ONE);

            expect(Emitter.trigger(EVENT_NAME_ONE)).toBe(false);
        });

        it('should return false if an event name doesn\'t exist or has no subscribed functions', () => {
            expect(Emitter.trigger(EVENT_NAME_ONE)).toBe(false);
            expect(Emitter.trigger(`random_event_${Math.random()}`)).toBe(false);
        });

        it('should throw an error if a non-string data type is passed as the first argument', () => {
            expectErrorThrownOnInvalidStringArgument(Emitter.trigger);
        });
    });
});
