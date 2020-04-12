import { default as envs } from '../env_config.json';

export function getEnvConfig(host) {
    for (let env of envs) {
        for (let h of env.hosts) {
            if (host.indexOf(h) > -1) {
                return env;
            }
        }
    }
}