import {
    prepare as prepareBase,
    verifyConditions as verifyConditionsBase,
} from '@semantic-release/changelog';
import {PrepareContext, VerifyConditionsContext} from 'semantic-release';

export const verifyConditions = async (
    pluginConfig: unknown,
    context: VerifyConditionsContext,
) => {
    await verifyConditionsBase(pluginConfig, context);
};

export const prepare = async (
    pluginConfig: unknown,
    context: PrepareContext,
) => {
    let onlyOnBranchesRegex: RegExp | undefined;
    if (
        pluginConfig &&
        typeof pluginConfig === 'object' &&
        'branches' in pluginConfig
    ) {
        if (typeof pluginConfig.branches === 'string') {
            onlyOnBranchesRegex = new RegExp(pluginConfig.branches);
            context.logger.log(
                'Configured branch regex: %s',
                pluginConfig.branches,
            );
        } else if (Array.isArray(pluginConfig.branches)) {
            // Escape branch names to be used in a regex, then join with |
            const escapedBranches = pluginConfig.branches.map(
                (branch: string) =>
                    branch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
            );
            onlyOnBranchesRegex = new RegExp(
                `^(${escapedBranches.join('|')})$`,
            );
            context.logger.log(
                'Configured branches: %s',
                pluginConfig.branches.join(', '),
            );
        }
    }

    // if the plugin is configured with a `branches` option, only run on those branches
    if (onlyOnBranchesRegex && !onlyOnBranchesRegex.test(context.branch.name)) {
        context.logger.log(
            'Current branch "%s" does not match configured branches, skipping prepareBase step.',
            context.branch.name,
        );
        return;
    }

    await prepareBase(pluginConfig, context);
};
