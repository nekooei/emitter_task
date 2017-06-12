// Note: An example of using the Emitter module
import * as Emitter from './src/emitter';

// Subscribe to the event name "emitter.example"
Emitter.on('emitter.example', (...args) => {
    console.log('The event was triggered with the following argument::', args); // eslint-disable-line no-console
});

// Trigger the event name "emitter.example" with multiple arguments
Emitter.trigger('emitter.example', 'trigger.argument.A', 'trigger.argument.B', 'trigger.argument.C');

// Remove all subscriptions for the event name "emitter.example"
Emitter.off('emitter.example');

// The subscribed function is not triggered due to being removed
Emitter.trigger('emitter.example', 'trigger.argument.D');
