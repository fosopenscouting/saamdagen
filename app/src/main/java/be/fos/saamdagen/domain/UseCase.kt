package be.fos.saamdagen.domain

interface UseCase<in UseCaseParameters, UseCaseResult> {

    fun execute(parameters: UseCaseParameters): UseCaseResult

}