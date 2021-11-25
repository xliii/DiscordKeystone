import repositories from "../repository/Repositories";

const aliasRepo = repositories.aliasRepository();

function processList(options: any, user: any): Promise<any> {
    return aliasRepo.List().then(aliases => {
        return aliases.length > 0 ?
            aliases.join('\n') :
            "No aliases available";
    });
}

module.exports = function processCommand(options: any, user: any): Promise<any> {
    const command = options.getSubcommand();
    switch (command) {
        case 'list':
            return processList(options, user);
        default:
            return Promise.resolve('Unknown command');
    }
};