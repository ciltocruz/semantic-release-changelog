import {PrepareContext, VerifyConditionsContext} from 'semantic-release';
import {prepare, verifyConditions} from './index';

jest.mock('@semantic-release/changelog');

import {
    verifyConditions as verifyConditionsBase,
    prepare as prepareBase,
} from '@semantic-release/changelog';

describe('verifyConditions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call the base plugin', async () => {
        const pluginConfig = {foo: 'bar'};
        const context = {fooz: 'barz'} as unknown as VerifyConditionsContext;
        await verifyConditions(pluginConfig, context);
        expect(verifyConditionsBase).toHaveBeenCalledWith(
            pluginConfig,
            context,
        );
    });
});

describe('prepare', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call the base plugin', async () => {
        const pluginConfig = {foo: 'bar'};
        const context = {
            logger: {log: jest.fn()},
            branch: {name: 'master'},
        } as unknown as PrepareContext;
        await prepare(pluginConfig, context);
        expect(prepareBase).toHaveBeenCalledWith(pluginConfig, context);
    });

    test.each([
        [null, 'develop'],
        [{}, 'master'],
        [{branches: undefined}, 'main'],
        [{branches: 12}, 'main'],
        [{branches: 'master'}, 'master'],
        [{branches: ['master', 'develop']}, 'master'],
        [{branches: ['master', 'develop']}, 'develop'],
        [{branches: '^(develop|master)$'}, 'master'],
    ])(
        'should run with config %s on branch %s',
        async (pluginConfig, branch) => {
            const context = {
                branch: {name: branch},
                logger: {log: jest.fn()},
            } as unknown as PrepareContext;
            await prepare(pluginConfig, context);
            expect(prepareBase).toHaveBeenCalledWith(pluginConfig, context);
        },
    );

    test.each([
        [{branches: 'fooo'}, 'main'],
        [{branches: ['master', 'develop']}, 'main'],
        [{branches: '^(develop|master)$'}, 'main'],
    ])(
        'should not run with config %s on branch %s',
        async (pluginConfig, branch) => {
            const context = {
                branch: {name: branch},
                logger: {log: jest.fn()},
            } as unknown as PrepareContext;

            await prepare(pluginConfig, context);
            expect(prepareBase).not.toHaveBeenCalled();
        },
    );
});
