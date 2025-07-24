export class MetodosEstaticos {
    static pegaIniciais(nome: any): string {
        let iniciais = '';
        let rgx = RegExp(/(\p{L})\p{L}+/gu);
        let initials = [...nome.matchAll(rgx)];
        iniciais = (
            (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();
        return iniciais;
    }
}